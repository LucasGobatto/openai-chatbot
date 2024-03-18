import "./styles.css";

export function Chat({ historic }) {
  return (
    <div className="historic-container">
      {(historic ?? []).map(({ question, response }, index) => (
        <div className="message-container" key={index}>
          <div className="text-container">
            <p className="user-question">{question}</p>
            <div className="profile">U</div>
          </div>
          <div className="text-container">
            <div className="profile">AI</div>
            <p className="ai-response">{response}</p>
          </div>
        </div>
      ))}
    </div>
  )
}