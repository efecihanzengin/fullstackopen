const Notification = ({ message, isGreen }) => {

  if (message === null) {
    return null
  }

  return (
    <div style={{
      color: isGreen ? "green" : "red",
      borderColor: isGreen ? "green" : "red"
    }} className="error">
      {message}
    </div >
  )
}

export default Notification