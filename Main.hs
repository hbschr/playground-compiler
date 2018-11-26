-- Main.hs

import Data.Char

expected x = error $ x ++ " expected"

data Expression =
  Num Int
  | Add Expression Expression
  | Sub Expression Expression
  deriving (Show)

emit :: Expression -> String
emit expr = case expr of
  Num x -> [intToDigit x]
  Add x y -> emit x ++ " + " ++ emit y
  Sub x y -> emit x ++ " - " ++ emit y

execute :: Expression -> Int
execute expr = case expr of
  Num x -> x
  Add x y -> execute x + execute y
  Sub x y -> execute x - execute y

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
