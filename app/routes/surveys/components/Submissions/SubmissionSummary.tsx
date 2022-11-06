import type { SubmissionEntity } from 'app/store/slices/surveySubmissionsSlice';
import type { SurveyEntity, QuestionEntity } from 'app/store/slices/surveysSlice';
import Results from './Results';
import styles from '../surveys.css';
import Button from 'app/components/Button';
type Props = {
  submissions: Array<SubmissionEntity>;
  addSubmission: (arg0: SubmissionEntity) => Promise<any>;
  survey: SurveyEntity;
  hideAnswer: (arg0: number, arg1: number, arg2: number) => Promise<any>;
  showAnswer: (arg0: number, arg1: number, arg2: number) => Promise<any>;
  editSurvey: (arg0: Record<string, any>) => Promise<any>;
  value: string;
  option: string;
};

const SubmissionSummary = ({
  submissions,
  survey,
  hideAnswer,
  showAnswer,
  editSurvey,
  option,
  value,
}: Props) => {
  const generateTextAnswers = (question) => {
    const texts = submissions
      .map((submission) => {
        const answer = submission.answers.find(
          (answer) => answer.question.id === question.id
        );
        return (
          answer && (
            <li
              key={answer.id}
              className={styles.adminAnswer}
              style={{
                backgroundColor:
                  answer.hideFromPublic && 'var(--lego-color-gray-light)',
                padding: answer.hideFromPublic && '5px',
              }}
            >
              <span>{answer.answerText}</span>
              {answer.hideFromPublic ? (
                <Button
                  flat
                  onClick={() =>
                    showAnswer(survey.id, submission.id, answer.id)
                  }
                >
                  vis
                </Button>
              ) : (
                <Button
                  flat
                  onClick={() =>
                    hideAnswer(survey.id, submission.id, answer.id)
                  }
                >
                  skjul
                </Button>
              )}
            </li>
          )
        );
      })
      .filter(Boolean);
    return texts.length === 0 ? <i>Ingen svar.</i> : texts;
  };

  const generateQuestionData = (question: QuestionEntity) => {
    const questionData = [];
    question.options.forEach((option) => {
      const selectedCount = submissions
        .map(
          (submission) =>
            submission.answers.find(
              (answer) => answer.question.id === question.id
            ) || {}
        )
        .filter((answer) =>
          (answer.selectedOptions || []).find((o) => o === option.id)
        ).length;
      questionData.push({
        option: option.optionText,
        selections: selectedCount,
      });
    });
    return questionData;
  };

  const graphData = {};
  survey.questions.forEach((question) => {
    graphData[question.id] = generateQuestionData(question);
  });
  return (
    <Results
      survey={survey}
      graphData={graphData}
      generateTextAnswers={generateTextAnswers}
      numberOfSubmissions={submissions.length}
      editSurvey={editSurvey}
      option={option}
      value={value}
    />
  );
};

export default SubmissionSummary;
