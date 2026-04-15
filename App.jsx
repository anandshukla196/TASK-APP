import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showCert, setShowCert] = useState(false);

  // Form States
  const [taskName, setTaskName] = useState("");
  const [subject, setSubject] = useState("General");

  // Load Data
  useEffect(() => {
    const savedUser = localStorage.getItem("student_session");
    const savedTasks = localStorage.getItem("student_tasks");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save Tasks
  useEffect(() => {
    localStorage.setItem("student_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Completion Logic
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const canGetCertificate = totalTasks > 0 && completionRate >= 80;

  const handleLogin = (e) => {
    e.preventDefault();
    const student = { name: e.target[0].value };
    setUser(student);
    localStorage.setItem("student_session", JSON.stringify(student));
  };

  const addTask = () => {
    if (!taskName.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskName, subject, completed: false }]);
    setTaskName("");
  };

  if (!user) {
    return (
      <div className="login-screen">
        <form className="login-box" onSubmit={handleLogin}>
          <h2>🎓 Student Portal</h2>
          <input type="text" placeholder="Enter Your Full Name" required />
          <button className="btn-primary">Start Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className={`app-wrapper ${dark ? 'dark' : ''}`}>
      <div className="container">
        
        <header className="header">
          <div>
            <h1>{user.name}'s Dashboard</h1>
            <p style={{color: '#64748b'}}>Progress: <strong>{completionRate.toFixed(0)}%</strong></p>
          </div>
          <div style={{display: 'flex', gap: '10px'}}>
            <button className="btn-primary" onClick={() => setDark(!dark)}>{dark ? "☀️" : "🌙"}</button>
            <button className="btn-logout" onClick={() => {setUser(null); localStorage.removeItem("student_session")}}>Logout</button>
          </div>
        </header>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card"><h3>{totalTasks}</h3><p>Total Tasks</p></div>
          <div className="stat-card"><h3>{completedTasks}</h3><p>Done</p></div>
          <div className="stat-card">
            <h3 style={{color: canGetCertificate ? '#10b981' : '#ef4444'}}>
              {canGetCertificate ? "UNLOCKED" : "LOCKED"}
            </h3>
            <p>Certificate Status</p>
          </div>
        </div>

        {/* Certificate Claim Area */}
        {canGetCertificate ? (
          <div className="cert-claim-banner">
            <p>🏆 Awesome! You've finished {completedTasks} tasks. Your certificate is ready!</p>
            <button className="btn-cert-active" onClick={() => setShowCert(true)}>Download My Certificate</button>
          </div>
        ) : (
          <div className="cert-lock-banner">
            <p>💡 Finish at least 80% of your tasks to unlock your certificate.</p>
          </div>
        )}

        {/* Input Form */}
        <div className="form-card">
          <input style={{flex: 2}} placeholder="Add new task..." value={taskName} onChange={e => setTaskName(e.target.value)} />
          <select value={subject} onChange={e => setSubject(e.target.value)}>
            <option>Math</option><option>Science</option><option>Coding</option><option>English</option>
          </select>
          <button className="btn-primary" onClick={addTask}>Add Task</button>
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.map(t => (
            <div key={t.id} className={`task-item ${t.completed ? 'completed' : ''}`}>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                <input 
                  type="checkbox" 
                  checked={t.completed} 
                  onChange={() => setTasks(tasks.map(x => x.id === t.id ? {...x, completed: !x.completed} : x))} 
                />
                <div>
                  <div style={{fontWeight: '700'}}>{t.text}</div>
                  <span className="subject-tag">{t.subject}</span>
                </div>
              </div>
              <button onClick={() => setTasks(tasks.filter(x => x.id !== t.id))}>🗑️</button>
            </div>
          ))}
        </div>

        {/* Certificate Modal */}
{showCert && (
  <div className="cert-overlay">
    <div className="certificate-paper" id="printable-cert">
      <div className="cert-inner-border">
        {/* Header Branding */}
        <div className="cert-org-name">जीत की अभिलाषा</div>
        <div className="cert-sub-org">Presented by FELICITY RUDRAxGARG</div>

        <h1 className="cert-main-title">CERTIFICATE OF EXCELLENCE</h1>
        
        <p className="cert-text-top">This is to officially recognize the hard work of</p>
        <h2 className="cert-user-name">{user.name.toUpperCase()}</h2>
        
        <div className="cert-achievement-box">
          <p>For successfully completing</p>
          <div className="task-count">{completedTasks} Assignments</div>
          <p>with a performance score of <strong>{completionRate.toFixed(0)}%</strong></p>
        </div>

        <div className="cert-footer">
          <div className="footer-side">
            <p className="date-text">Date: {new Date().toLocaleDateString()}</p>
            <p className="issue-text">Certificate ID: FEL-{Date.now().toString().slice(-6)}</p>
          </div>
          
          <div className="signature-side">
            <div className="digital-sig">Anand Shukla</div>
            <div className="sig-line"></div>
       
            <p className="sig-sub">Digital Signature Verified</p>
          </div>
        </div>
      </div>
    </div>
    
    <div className="cert-actions no-print">
      <button className="btn-primary" onClick={() => window.print()}>💾 Download PDF</button>
      <button className="btn-primary" style={{background: '#64748b'}} onClick={() => setShowCert(false)}>✖ Close</button>
    </div>
  </div>
)}

      </div>
    </div>
  );
}