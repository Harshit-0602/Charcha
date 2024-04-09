import "./spinner.css";

const Spinner = () => {
    return (
      <>
        <div className="spinnerMain">
          <h2>Loading ....Please Wait</h2>
          <div className="spinner"></div>
        </div>
      </>
    );
}

export { Spinner };