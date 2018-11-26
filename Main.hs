-- Main.hs

import Data.Char

expected x = error $ x ++ " expected"

data Expression =
  Num Int
  | Add Expression Expression
  | Sub Expression Expression
  deriving (Show)

term :: Char -> Expression
term x
  | isDigit x = Num (digitToInt x)
  | otherwise = expected "Digit"

-- addOperation :: Char -> Expression
addOperation x
  | x == '+' = Add
  | x == '-' = Sub
  | otherwise = expected "AddOp"

expression [x] = term x
expression (x:y:zs) = addOperation y (expression [x]) (expression zs)
