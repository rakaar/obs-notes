```
X_train = X_train.reset_index(drop=True)
y_train = y_train.reset_index(drop=True)
```
it is important to drop reset index after u split using `train_test_split` because the indices are old indices