const Notification = ({ message, isGreen }) => {

  if (!message) {
    return null
  }
  
  const className = isGreen ? "success" : "error"

  return (
    <div className={className}>
      {message}
    </div >
  )
}

export default Notification