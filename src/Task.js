import moment from "moment";

export default function Task({ task, deleteTask, toggleImportant }) {
    const { id, title, date, important } = task
    return (
        <div className={`task ${important && 'important'}`} onDoubleClick={() => toggleImportant(id)}>
            <span onClick={() => deleteTask(id)}><i className="fas fa-times"></i></span>
            <h3>{title}</h3>
            <p>{moment(date).format('DD-MMM-YYYY hh:mm:ss A')}</p>
        </div>
    );
}