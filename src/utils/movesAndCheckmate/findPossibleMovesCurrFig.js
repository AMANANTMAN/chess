import { findAllMovesAllFigures } from "./findAllMovesAllFigures";
import allMovingFiguresFns from "../figures/allMovingFiguresFns";
import { checkIfKingIsUnderCheckmate } from "./checkIfKingIsUnderCheckmate";
import { determineCurrentFigure } from "../gameFlowHelpers/determineCurrentFigure";

export const findPossibleMovesCurrFig = ({
  board,
  player,
  currFigure,
  currField,
  notation,
  startFields,
  isGameEnded,
  state,
}) => {
  const [currentRow, currentCol] = currField?.split("-");
  const figure = determineCurrentFigure(currFigure);

  // find all moves of opposite player
  const pawnSpecialMoves = true;
  const allPossibleMoves = findAllMovesAllFigures({
    board: board,
    player: player,
    notation: notation,
    pawnSpecialMoves: pawnSpecialMoves,
    startFields: startFields,
  });

  let possibleMovesCurrFig = [];

  // if figure is KING, it can move only on fields that not under attack of opposite figures
  if (figure === "K") {
    possibleMovesCurrFig = allMovingFiguresFns["K"]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    }).filter((element) => !allPossibleMoves.includes(element));

    // KING in check => GAME END
    if (possibleMovesCurrFig.length === 0 && !isGameEnded) {
      state.end.isGameEnded = true;
      state.end.howIsGameEnded = "checkmate";
      state.end.loser = player;
      state.end.winner = player === "W" ? "B" : "W";
    }

    // if is OTHER figure => two possibilities:
  } else {
    //1) if moving of that figure would cause king to be checkmated, figure does not have possible moves
    const newBoard = [];
    board.forEach((el) => newBoard.push([...el]));
    newBoard[currentRow][currentCol] = null;

    const movesOfCurrFigureArray = (possibleMovesCurrFig = allMovingFiguresFns[
      figure
    ]({
      board: board,
      player: player,
      currentRow: currentRow,
      currentCol: currentCol,
      notation: notation,
      startFields: startFields,
    })?.filter((el) => el !== "en passant" && el !== "pawn promotion"));

    const isCheckArray = [];
    movesOfCurrFigureArray.forEach((el) => {
      const [row, col] = el?.split("-");

      const updatedBoard = [];
      newBoard.forEach((elem) => updatedBoard.push([...elem]));
      updatedBoard[row][col] = currFigure;

      isCheckArray.push(
        checkIfKingIsUnderCheckmate(updatedBoard, player, notation, startFields)
      );
    });

    if (isCheckArray.every((element) => element)) {
      possibleMovesCurrFig = [];
      //2) king is NOT checkmated (figure can move on its possible moves)
    } else {
      possibleMovesCurrFig = allMovingFiguresFns[figure]({
        board: board,
        player: player,
        currentRow: currentRow,
        currentCol: currentCol,
        notation: notation,
        startFields: startFields,
      })?.filter((el) => el !== "en passant" && el !== "pawn promotion");
    }
  }
  return possibleMovesCurrFig;
};
