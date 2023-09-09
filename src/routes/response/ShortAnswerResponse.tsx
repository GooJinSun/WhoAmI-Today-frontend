import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import MainContainer from '@components/_common/main-container/MainContainer';
import SendQuestionModal from '@components/question/send-question-modal/SendQuestionModal';
import QuestionItem from '@components/response/question-item/QuestionItem';
import ResponseCompleteModal from '@components/response/response-complete-modal/ResponseCompleteModal';
import ResponseInput from '@components/response/response-input/ResponseInput';
import TitleHeader from '@components/title-header/TitleHeader';
import { DEFAULT_MARGIN, TITLE_HEADER_HEIGHT } from '@constants/layout';
import { Font, Layout } from '@design-system';
import useAsyncEffect from '@hooks/useAsyncEffect';
import { ShortAnswerQuestion } from '@models/post';
import { getQuestionDetail, responseQuestion } from '@utils/apis/question';

// 주관식 질문 답변
function ShortAnswerResponse() {
  const { questionId } = useParams();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [question, setQuestion] = useState<ShortAnswerQuestion | null>(null);
  const navigate = useNavigate();
  const [hasPosted, setHasPosted] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [t] = useTranslation('translation', { keyPrefix: 'question.response' });

  // 질문 보내기 선택
  const handleSend = () => {
    setSendModalVisible(true);
  };

  const handleNavigateToResponseHistory = () => {
    return navigate(`/response-history/${questionId}`, { replace: true });
  };

  // 질문 보내기 skip
  const handleSkipSendQuestion = () => {
    setSendModalVisible(false);
    handleNavigateToResponseHistory();
  };

  const handleConfirmSendQuestion = () => {
    // 이미 답변을 보낸 상태라면 response history 페이지로 이동
    if (hasPosted) handleNavigateToResponseHistory();
  };

  const handlePost = async () => {
    // 1. 답변 제출
    if (!textareaRef.current) return;
    const res = await responseQuestion({
      question_id: Number(questionId),
      content: textareaRef.current.value,
    });
    if (res) {
      setShowComplete(true);
      setHasPosted(true);
    }
  };

  const handleSendQuestion = () => {
    // 2. 질문 보내기 모달 노출
    setSendModalVisible(true);
  };

  useAsyncEffect(async () => {
    const res = await getQuestionDetail(Number(questionId));
    setQuestion(res);
  }, [questionId]);

  if (!question) return null;

  return (
    <MainContainer>
      <TitleHeader
        RightComponent={
          <button type="button" onClick={handlePost}>
            <Font.Display type="18_bold" color="BASIC_BLACK">
              {t('post')}
            </Font.Display>
          </button>
        }
      />
      <Layout.FlexCol mt={TITLE_HEADER_HEIGHT + 14} w="100%" ph={DEFAULT_MARGIN}>
        <QuestionItem question={question} onSend={handleSend} />
        <ResponseInput inputRef={textareaRef} />
      </Layout.FlexCol>
      <SendQuestionModal
        questionId={question.id}
        isVisible={sendModalVisible}
        setIsVisible={setSendModalVisible}
        onSkip={handleSkipSendQuestion}
        onSend={handleConfirmSendQuestion}
        closeOnBackdrop={!hasPosted}
      />
      <ResponseCompleteModal
        isVisible={showComplete}
        setIsVisible={setShowComplete}
        onSendQuestion={handleSendQuestion}
      />
    </MainContainer>
  );
}

export default ShortAnswerResponse;
