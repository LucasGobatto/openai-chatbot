import React from 'react';
import { Chat } from '../../components/chat';
import { Form } from '../../components/form';
import { SafeAreaView } from '../../components/safe-area-view';
import { DeviceIdProvider, JobVacancyDescriptionProvider } from '../../providers';

const PageState = { Form: 1, Chat: 2 };

export const Chatbot = (props) => {
  const [pageState, setPageState] = React.useState(PageState.Form);
  console.log(pageState);

  const handleBack = () => {
    if (pageState === PageState.Chat) {
      setPageState(PageState.Form);
    } else {
      props.onNavigate('home');
    }
  };

  return (
    <SafeAreaView title='Chatbot' onBack={handleBack} noScroll>
      <JobVacancyDescriptionProvider>
        {pageState === PageState.Form && <Form onSubmit={() => setPageState(PageState.Chat)} />}
        {pageState === PageState.Chat && (
          <DeviceIdProvider>
            <Chat />
          </DeviceIdProvider>
        )}
      </JobVacancyDescriptionProvider>
    </SafeAreaView>
  );
};
