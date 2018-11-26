-- Main.hs

import Data.Char

expected x = error $ x ++ " expected"

term :: Char -> String
term x
  | isDigit x = [x]
  | otherwise = expected "Digit"

addOperation :: Char -> String
addOperation x
  | x == '+' = "+"
  | x == '-' = "-"
  | otherwise = expected "AddOp"

expression [x] = term x
expression (x:y:zs) = term x ++ addOperation y ++ expression zs
