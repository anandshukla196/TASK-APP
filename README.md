# 🎯 TASK APP

A modern task management web application where users can complete tasks and generate downloadable certificates instantly.

---

# 🚀 Features

- ✅ User Authentication
- ✅ Task Management System
- ✅ Task Completion Tracking
- ✅ Automatic Certificate Generation
- ✅ PDF Certificate Download
- ✅ Responsive Design
- ✅ Modern User Interface
- ✅ Unique Certificate ID

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- jsPDF

---

# ⚡ How It Works

1. User logs into the application
2. User completes assigned tasks
3. Generate Certificate button becomes active
4. Certificate is automatically generated
5. User downloads certificate in PDF format

---

# 📜 Certificate Includes

- User Name
- Task Name
- Completion Date
- Certificate ID
- Digital Signature

---

# 💻 Example Certificate Generator Code

```javascript
function generateCertificate() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const username = "Anand Shukla";

    doc.setFontSize(24);
    doc.text("Certificate of Completion", 45, 40);

    doc.setFontSize(16);
    doc.text("This certificate is proudly awarded to", 45, 70);

    doc.setFontSize(22);
    doc.text(username, 75, 95);

    doc.setFontSize(14);
    doc.text("For Successfully Completing the Assigned Task", 25, 125);

    doc.save("certificate.pdf");
}
```

---

# 🌟 Future Improvements

- Firebase Integration
- Admin Dashboard
- AI Task Validation
- QR Code Verification
- Online Certificate Verification

---

# 🤝 Contributing

Contributions are welcome!

Fork this repository and create a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developed By

## Anand Shukla

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.
