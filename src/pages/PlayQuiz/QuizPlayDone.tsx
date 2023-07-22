/* eslint-disable @typescript-eslint/no-misused-promises */

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { NavLink } from "react-router-dom";
import React from "react";
import answerCreator from "@/lib/answer-creator";
import { privateAxios } from "@/lib/api";
import { quizPlaySubmit } from "@/store/slices/quiz-play.slice";

export default function QuizPlayDone() {
  const {
    progress,
    questionSet,
    isSubmitted,
    totalQuestions,
    currentOrganization,
  } = useAppSelector((state) => state.persist.quizPlay);
  const summary = React.useMemo(() => {
    return answerCreator.createPayload(progress);
  }, [progress]);
  const dispatch = useAppDispatch();
  const submitResults = async () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    try {
      await privateAxios.post(
        `/quiz/quiz_leaderboard/${questionSet?.uid}/leaderboard/`,
        summary
      );
      // console.log({ response });
      dispatch(quizPlaySubmit());
    } catch (_) {
      // console.log({ error });
      dispatch(quizPlaySubmit());
    }
  };
  return (
    <div>
      {questionSet?.quiz_type === "NR" ? (
        <div>
          {!isSubmitted && (
            <h1>Congratulations you have completed the quiz.👏 </h1>
          )}
          <div className="max-w-xl p-2 border mx-auto my-2 shadow-md py-4">
            {!isSubmitted && (
              <>
                <h2 className="underline text-primary">Summary</h2>
                <div>
                  <p>
                    Total Questions: {totalQuestions} <br />
                  </p>
                  <p>Total Points scored: {summary.points_earned}</p>
                  <p>
                    Average time:{" "}
                    {(summary.time_used! / totalQuestions).toFixed(2)} seconds
                  </p>
                </div>
              </>
            )}
            <div>
              {isSubmitted ? (
                <div className="flex flex-col gap-4">
                  <h1 className="text-green-500 text-xl">
                    Thank you for submitting your results
                  </h1>
                  <div className="flex  gap-2 items-center justify-center">
                    <NavLink
                      to={`/organizations/${currentOrganization}`}
                      className="border border-primary rounded-lg px-4 py-1 text-primary"
                    >
                      Back to quizzes
                    </NavLink>
                    <NavLink
                      to={`/organizations/questionsets/${questionSet.uid}/leaderboard`}
                      className="bg-primary text-white px-4 py-1 rounded-lg"
                    >
                      Leaderboard
                    </NavLink>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={submitResults}
                    className="bg-primary text-white px-4 py-1 rounded-lg mt-4"
                  >
                    Submit Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {!isSubmitted && (
            <h1>Congratulations you have completed the quiz.</h1>
          )}
          <div className="max-w-xl p-2 border mx-auto my-2 shadow-md py-4">
            {!isSubmitted && (
              <div>
                <h2 className="underline text-primary">Summary</h2>
                <div>
                  <p>
                    Total Questions: {totalQuestions} <br />
                  </p>
                  <p>
                    Average time:{" "}
                    {(summary.time_used! / totalQuestions).toFixed(2)} seconds
                  </p>
                </div>
              </div>
            )}

            <div>
              <div>
                {isSubmitted ? (
                  <div className="flex flex-col gap-4">
                    <h1 className="text-green-500 text-xl">
                      Thank you for submitting your results
                    </h1>
                    <div className="flex  gap-2 items-center justify-center">
                      <NavLink
                        to={`/organizations/${currentOrganization}`}
                        className="border border-primary rounded-lg px-4 py-1 text-primary"
                      >
                        Back to quizzes
                      </NavLink>
                      <NavLink
                        to={`/organizations/questionsets/${
                          questionSet!.uid
                        }/leaderboard`}
                        className="bg-primary text-white px-4 py-1 rounded-lg"
                      >
                        Leaderboard
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onClick={submitResults}
                      className="bg-primary text-white px-4 py-1 rounded-lg mt-4"
                    >
                      Submit Results
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 w-fit mx-auto max-w-xl">
        <strong className="font-bold">Note: </strong>
        <span className="block sm:inline">
          You can only submit your results once. Once you have submitted your
          results you cannot change them. Results will be available to view once
          the games have ended.
        </span>
      </div>
    </div>
  );
}