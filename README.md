# Receiving and Sending SMS Messages Using NeRu and the Messages API (V0.1)

This project shows how to use NeRu to receive and send SMS messages with the Messages API V0.1.

## Running the project

To run the project after downloading/cloning, first install the dependencies:

```sh
npm install
```

Create a Vonage Application if you do not have one already, and [link a phone number](https://dashboard.nexmo.com) to the application:

```sh
neru app create --name "neru application"  
```

Go to [your application](https://dashboard.nexmo.com/applications) on the Vonage API Dashboard and set the right version of Messages API. For this app it should be v1:

![dashboard messages setting](dashboard.png)

Then initialize NeRu, choosing the `node.js` for runtime and `skip` for the template:

```sh
neru init
```

This will create a `neru.yml` file for you. In that file add the linked number under `configurations`:

```yml
project:
    name: $YOUR_PROJECT_NAME
instance:
    name: dev
    runtime: nodejs
    region: aws.euw1
    application-id: $YOUR_VONAGE_APPLICATION_ID
    configurations:
    contact:
        number: "$YOUR_VONAGE_NUMBER"
        type: phone
```

Then start the project locally using:

```sh
neru debug
```

Now you text the number linked to your application.