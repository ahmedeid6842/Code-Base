<a name="readme-top"></a>

<p align="center"><img src="https://nats.io/img/logos/nats-horizontal-color.png" alt="logo-no-background"></p>

<h1 align="center">NATS code-base</h1>

<p>This is a code base for building event bus systems using NATS streaming server, featuring both publisher and listener roles. The code is designed to connect to a customized channel named `ticket:created`, and the NATS streaming server is running as a Docker container through k8s cluster with ports 4222 and 8222 forwarded for monitoring purposes.</p>

<p align="center"><img src="https://github.com/ahmedeid6842/Vending/assets/57197702/39a1478d-e532-46c1-8adc-8c600e7a9c31" alt="nats drawio"></p>

<p>To ensure reliable events delivery and prevent event loss, the listener uses NATS' redelivery durable feature, which allows it to receive all previously sent events, manually acknowledge each events it receives, and resume events delivery from where it left off in case of a restart or failure.</p>

<p>It takes advantage of TypeScript interfaces, enums, and generators to simplify the setup of channel names and data types passed through each channel. The code includes a base listener and publisher classes that can be extended to create custom listeners and publishers with strong typing.</p>

<p align="center"><img src="https://github.com/ahmedeid6842/Vending/assets/57197702/8de91d92-305f-4d23-8a25-771dd01813db" alt="nats-Page-2 drawio"></p>

<p>These features work together to provide a robust and reliable connection with the NATS streaming server, ensuring that events are delivered and operated according to the application's requirements.</p>

## 🛠 Built With <a name="built-with"></a>
<p>

[![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NATS](https://img.shields.io/badge/-NATS-76D0C8?style=for-the-badge&logo=nats&logoColor=white)](https://nats.io/)
[![Kubernetes](https://img.shields.io/badge/-Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)](https://kubernetes.io/)

</p>

## 💻 Getting Started <a name="getting-started"></a>

### Prerequisites ❗<a name="prerequisites"></a>

In order to run this project you need:

<p>
 <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=nodejs&theme=dark"/>
    </a>
    <a href="https://www.npmjs.com/"><img src="https://authy.com/wp-content/uploads/npm-logo.png" width="50px" height="50"/></a>
 <a href="https://skillicons.dev">
        <img src="https://skillicons.dev/icons?i=kubernetes&theme=dark"/>
    </a>
 </p>

### Setup ⬇️ <a name="setup"></a>

Clone this repository to your desired folder:

```bash
cd my-folder
git clone https://github.com/ahmedeid6842/Code-Base.git
cd ./nats_streaming_service
```

### Installation :heavy_check_mark: <a name="install"></a>

To install the project, follow these steps:

1. Install the project dependencies by running the following command in your terminal:

```
npm install
```

2. Deploy the NATS server to your Kubernetes cluster by running the following command:

```
kubectl apply -f ./src/k8s/nats-depl.yaml
```

3. To forward incoming requests to the NATS server, you need to apply port forwarding. First, find the name of the NATS pod by running the following command:

```
kubectl get pods
```

Look for the pod that starts with `nats-depl`. Note down the pod name.

4. Apply port forwarding by running the following command, replacing `<pod-name>` with the name of the NATS pod you found in the previous step:

```
kubectl port-forward pod/<pod-name> 4222:4222 8222:8222
```

> This will create a secure tunnel between your local machine and the NATS server, and forward any traffic received on port 4222 or 8222 of your local machine to the corresponding port on the NATS pod.

You can now start sending requests to the NATS server from your local machine.

### Usage 🤿 🏃‍♂️ <a name="usage"></a>

To run the project using NPM, follow these steps:

### Start a Publisher

To start a publisher, run the following command in your terminal:

```bash
npm run publish
```

This will start the publisher application and allow you to send events to the NATS server.

![publisher-gif](https://github.com/ahmedeid6842/Vending/assets/57197702/c81d8b4c-227c-47ff-bcff-534102ecae95)

### Start a Listener

To start a listener, run the following command in your terminal:

```bash
npm run listen
```

This will start the listener application and allow you to receive events from the NATS server.

![Listener](https://github.com/ahmedeid6842/Vending/assets/57197702/4761c144-d5f1-45c7-888e-5cd83c709c88)

**Note:** that you need to have the NATS server running and port forwarding set up before you can use the publisher and listener applications. See the [Installation](#installation) section for instructions on how to set up the NATS server and port forwarding.

-------- 


The GIF shows one publisher and two listeners sending and receiving events using the NATS server. The publisher sends events, which are received by both listeners, demonstrating the server's ability to distribute events to multiple subscribers.

![Peek 2023-06-26 11-07](https://github.com/ahmedeid6842/Vending/assets/57197702/6a88c015-3128-46bf-b110-dfda449cba94)

## 👤 Author <a name="author"></a>
**Ahmed Eid 🙋‍♂️**
- Github: [@ahmedeid6842](https://github.com/ahmedeid6842/)
- LinkedIn : [Ahmed Eid](https://www.linkedin.com/in/ahmed-eid-0018571b1/)
- Twitter: [@ahmedeid2684](https://twitter.com/ahmedeid2684)



## 🤝 Contributing 

##### Contributions to this project are greatly appreciated and welcomed from anyone interested in improving it 💟.

## ⭐️ Show your support <a name="support"></a>

If you find this project helpful, I would greatly appreciate it if you could leave a star! 🌟 💟


