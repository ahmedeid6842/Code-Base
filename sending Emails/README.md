<a name="readme-top"></a>

<h1 align="center">Nodemailer Sending Email Code Base</h1>

<p align="center"><img src="https://blog.nodemailer.com/wp-content/uploads/2017/01/cropped-nm_logo_1000x680.png" alt="Node-Mailer-logo"></p>

📧📨 This code base provides a straightforward way to send emails using Node.js and Nodemailer. 💻 With just a few lines of code, you can set up an Express.js server that listens for incoming requests and sends an email using the provided credentials. 🚀 Whether you're building a web application or just need to send occasional emails, this code base can help you get started quickly and easily. 💪

<p align="center"><img src="https://github.com/ahmedeid6842/Code-Base/assets/57197702/2629f222-68a1-4f35-80fe-4af1e71a374f" alt="Event-flow"></p>

## 🛠 Built With <a name="built-with"></a>
[![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![Nodemailer](https://img.shields.io/badge/-Nodemailer-4B2E83?style=for-the-badge&logo=nodemailer&logoColor=white)](https://nodemailer.com/)



## 💻 Getting Started <a name="getting-started"></a>

### Prerequisites ❗<a name="prerequisites"></a>

In order to run this project, you need to install Node.js and NPM.

### Setup ⬇️ <a name="setup"></a>

Clone this repository to your desired folder:

```bash
cd my-folder
git clone https://github.com/ahmedeid6842/Code-Base.git
cd ./sending-email-code-base
```

### Installation :heavy_check_mark: <a name="install"></a>

To install the project, follow these steps:

1. Install the project dependencies by running the following command in your terminal:

```
npm install
```

2. Create a `.env` file in the root of the project and add the following variables:

```
EMAIL=YOUR_EMAIL_ADDRESS
PASSWORD=YOUR_EMAIL_PASSWORD
```

> Make sure to replace `YOUR_EMAIL_ADDRESS` and `YOUR_EMAIL_PASSWORD` with your actual email credentials that you will sent the emails from.

### Usage 🤿 🏃‍♂️ <a name="usage"></a>

To run the project using NPM, follow these steps:

1. Start the server by running the following command in your terminal:

```
npm start
```

2. Send a POST request to `http://localhost:3000/` with the following JSON payload:

```
{
    "to": "recipient@example.com",
    "subject": "Test Email",
    "text": "This is a test email sent using Node.js and Nodemailer."
}
```

> Make sure to replace `recipient@example.com` with the actual recipient email address.

3. The server will send an email using the provided credentials and return a response with the message "email was sent successfully" if the email was sent successfully, or "an error has been occurred" if an error occurred.

## 👤 Author <a name="author"></a>
**Ahmed Eid 🙋‍♂️**
- Github: [@ahmedeid6842](https://github.com/ahmedeid6842/)
- LinkedIn : [Ahmed Eid](https://www.linkedin.com/in/ahmed-eid-0018571b1/)
- Twitter: [@ahmedeid2684](https://twitter.com/ahmedeid2684)

## 🤝 Contributing 

##### Contributions to this project are greatly appreciated and welcomed from anyone interested in improving it 💟.

## ⭐️ Show your support <a name="support"></a>

If you find this project helpful, I would greatly appreciate it if you could leave a star! 🌟 💟