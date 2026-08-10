#!/usr/bin/env node
import { promises as fs } from "node:fs"
import { execFile } from "node:child_process"
import path from "node:path"
import { promisify } from "node:util"
import matter from "gray-matter"

const CONTENT_DIR = path.resolve(process.cwd(), "content")
const INDEX_PATH = path.join(CONTENT_DIR, "index.md")
const execFileAsync = promisify(execFile)
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const DATE_FILE_REGEX = /(?:^|[^\d])(\d{4})-(\d{2})-(\d{2})(?:[^\d]|$)/

function monthKey(date) {
  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, "0")
  return `${year}-${month}`
}

function folderYearLabel(filePath) {
  const relative = path.relative(CONTENT_DIR, filePath).replace(/\\/g, "/")
  const prefix = relative.split("/")[0]
  return /^\d{4}$/.test(prefix) ? Number(prefix) : null
}

function monthLabelFromKey(key) {
  if (key.endsWith("-00")) {
    return `Undated ${key.slice(0, 4)}`
  }
  const [year, month] = key.split("-")
  const monthIndex = Number(month) - 1
  return `${MONTHS[monthIndex]} ${year}`
}

async function gitDate(filePath) {
  try {
    const { stdout } = await execFileAsync("git", ["log", "-1", "--format=%aI", "--", filePath], {
      encoding: "utf8",
      cwd: process.cwd(),
    })
    if (!stdout) {
      return null
    }
    const parsed = new Date(stdout.trim())
    return Number.isNaN(parsed.valueOf()) ? null : parsed
  } catch {
    return null
  }
}

function parseDateFromFilename(fileName) {
  const match = fileName.match(DATE_FILE_REGEX)
  if (!match) {
    return null
  }

  const [_, year, month, day] = match
  const parsed = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  return Number.isNaN(parsed.valueOf()) ? null : parsed
}

async function resolveDate(filePath, markdownContent) {
  const parsed = matter(markdownContent)
  if (parsed?.data?.date) {
    const fromFrontMatter = new Date(parsed.data.date)
    if (!Number.isNaN(fromFrontMatter.valueOf())) {
      return { date: fromFrontMatter, title: parsed.data.title }
    }
  }

  const fileDate = parseDateFromFilename(path.basename(filePath))
  if (fileDate) {
    return { date: fileDate, title: parsed.data?.title }
  }

  const stat = await fs.stat(filePath)

  const folderYear = folderYearLabel(filePath)
  if (folderYear !== null) {
    if (stat.mtime.getUTCFullYear() === folderYear) {
      return { date: stat.mtime, title: parsed.data?.title }
    }
    const firstOfYear = new Date(Date.UTC(folderYear, 0, 1))
    return { date: firstOfYear, monthOnly: "00", title: parsed.data?.title }
  }

  const fromGit = await gitDate(filePath)
  if (fromGit) {
    return { date: fromGit, title: parsed.data?.title }
  }

  const fallbackDate = new Date(
    Date.UTC(stat.mtime.getUTCFullYear(), stat.mtime.getUTCMonth(), stat.mtime.getUTCDate()),
  )
  return { date: fallbackDate, title: parsed.data?.title }
}

async function gatherNotes(dir, collected = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    const relativePath = path.relative(CONTENT_DIR, fullPath).replace(/\\/g, "/")

    if (entry.isDirectory()) {
      await gatherNotes(fullPath, collected)
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    if (!fullPath.endsWith(".md")) {
      continue
    }

    if (relativePath === "index.md") {
      continue
    }

    const raw = await fs.readFile(fullPath, "utf8")
    const { date, monthOnly = null, title: frontmatterTitle } = await resolveDate(fullPath, raw)

    const slug = relativePath.replace(/\.md$/, "")
    const fallbackTitle = path.basename(relativePath).replace(/\.md$/, "")
    const title =
      frontmatterTitle && String(frontmatterTitle).trim()
        ? String(frontmatterTitle).trim()
        : fallbackTitle

    const key = monthOnly ? `${date.getUTCFullYear()}-${monthOnly}` : monthKey(date)
    collected.push({ slug, title, date, key })
  }

  return collected
}

function sortAndRender(notes) {
  const byMonth = new Map()
  for (const note of notes) {
    if (!byMonth.has(note.key)) {
      byMonth.set(note.key, [])
    }
    byMonth.get(note.key).push(note)
  }

  const monthGroups = [...byMonth.entries()].map(([key, items]) => {
    const [year, month] = key.split("-").map(Number)
    const label = monthLabelFromKey(key)
    const sortValue = month === 0 ? 0 : month
    items.sort((a, b) => {
      if (b.date.getTime() !== a.date.getTime()) {
        return b.date.getTime() - a.date.getTime()
      }
      return a.title.localeCompare(b.title)
    })
    return { year, sortValue, label, items, key }
  })

  monthGroups.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year
    }
    return b.sortValue - a.sortValue
  })

  const lines = ["---", "title: Rakaar's Notes", "---", "", "Notes organized by month.", ""]

  for (const group of monthGroups) {
    if (group.items.length === 0) {
      continue
    }
    lines.push(`## ${group.label}`)
    lines.push("")
    for (const note of group.items) {
      lines.push(`- [[${note.slug}]]`)
    }
    lines.push("")
  }

  return `${lines.join("\n").trimEnd()}\n`
}

async function run() {
  const notes = await gatherNotes(CONTENT_DIR)
  const rendered = sortAndRender(notes)
  await fs.writeFile(INDEX_PATH, rendered, "utf8")
}

run().catch((error) => {
  console.error("[generate-index] failed:", error)
  process.exit(1)
})
