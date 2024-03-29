https://www.youtube.com/watch?v=OIenNRt2bjg

- Inplace modification vs assigning new
w -= 0.01*w.grad

w = w - 0.01* w.grad 

are different. In second case,  you are assigning a new tensor to w. It might not have initially declared properties like requires_grad = True.

Imp points
```
    # Cleaning grad  before applying backward
    if w.grad is not None:
        w.grad.zero_()
    
    loss_val.backward()

    # should not calculate grad of its own re-assignment
    with torch.no_grad():
        w -= 0.01 * w.grad
```


- Broadcasting
-torch.size(50) means 1 x 50. While broadcasting checking, the smaller dimension one is row vector(a single row)