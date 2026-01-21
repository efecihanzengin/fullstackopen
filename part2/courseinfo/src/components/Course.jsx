
const Course = ({ courses }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        const sum = course.parts.reduce((acc, x) => acc + x.exercises, 0);
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            {course.parts.map((x) => (
              <p key={x.id}>
                {x.name} {x.exercises}
              </p>
            ))}
            <p>Total of {sum} exercises</p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
