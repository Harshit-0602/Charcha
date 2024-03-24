import "./Msg.css";

const Msg = () => {
  return (
    <div className="msg">
      <div className="inputText">
        <textarea
          name="text"
          id="text"
          cols="30"
          rows="10"
          placeholder="Type your message here..."
        ></textarea>
        <button type="sumbit" className="send btn">
          <img src="send-message (1).png" alt="" />
        </button>
        <button type="file" className="file btn">
          <img src="attach-file.png" alt="" />
        </button>
      </div>
    </div>
  );
};
export { Msg };
