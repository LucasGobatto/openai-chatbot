import "./chat.css";

export function Chat({ historic }) {
  return (
    <>
      {(historic ?? []).map(({ question, response }, index) => (
        <div className="chat-history-container" key={index}>
          <p className="user-question">{question}</p>
          <p className="ai-response">{response}</p>
        </div>
      ))}
    </>
  )
}