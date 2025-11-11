# Mqtt

[react-native-mqtt](https://github.com/Introvertuous/react-native-mqtt)

`npm install react_native_mqtt --save`

## <a id="goBack">Пример и типы</a>

- [Mqtt](#mqtt)
  - [Пример и типы](#пример-и-типы)
    - [init](#init)
    - [Client](#client)
    - [Connect](#connect)
    - [Subscribe](#subscribe)
    - [Unsubscribe](#unsubscribe)
    - [Send](#send)
    - [Publicsh](#publicsh)
    - [Disconnect](#disconnect)
    - [GetTraceLog](#gettracelog)
    - [StartTrace](#starttrace)
    - [StopTrace](#stoptrace)
    - [IsConnected](#isconnected)
    - [Message](#message)
    - [Errors](#errors)

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage"; // работает только с этим хранилищем в expo
import init from "react_native_mqtt";

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync: {},
});

const options = {
  host: process.env.EXPO_PUBLIC_MQTT_SERVER,
  port: +process.env.EXPO_PUBLIC_MQTT_PORT,
  path: "/home",
  id: process.env.EXPO_PUBLIC_MQTT_USER_ID,
};

//@ts-ignore
export const client = new Paho.MQTT.Client(
  options.host,
  options.port,
  options.path
);

// подписка на топик
 function mqttSubscribeTopic(topic: string) {
  client.subscribe(topic, { qos: 1 });
}

// срабатывает при установлении соединения
function onConnect(topic: string) {
  console.log("onConnect");
  mqttSubscribeTopic(topic);
}

function onFailure(message: any) {
  console.log("onMessageArrived:" + message.errorMessage);
}

// сообщает о потере соединения
function onConnectionLost(responseObject: {
  errorCode: number,
  errorMessage: string,
}) {
  console.log("esponseObject.errorCode:", responseObject.errorCode);
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// ответ от брокера
async function onMessageArrived(message: {
    payloadString: string;
    destinationName: string;
  }) {
    const value = message.payloadString;
    const key = message.destinationName
      .split("/")
      .slice(-1)[0] as HomeStateTopics;

    console.log("key:", key); // последнее слово топика
    console.log("topic:" + message.destinationName); // топик (полное название)
    console.log("value:" + message.payloadString); // значение
  }



const unSubscribeTopic = () => {
  // client.unsubscribe(subscribedTopic);
};

const sendMessage = () => {
  //@ts-ignore
  // var message = new Paho.MQTT.Message(options.id + ":" + message);
  // message.destinationName = subscribedTopic;
  // client.send(message);
};

client.onMessageArrived = onMessageArrived;
client.onConnectionLost = onConnectionLost;


// Нужно установить соединение и подписаться на рассылку
export function mqttConnect(topic: string) {
  client.connect({
    onSuccess: () => onConnect(topic),
    useSSL: true,
    userName: process.env.EXPO_PUBLIC_MQTT_USER,
    password: process.env.EXPO_PUBLIC_MQTT_PASS,
    onFailure,
    keepAliveInterval: 200,
    reconnect: true,
  });
}
```

[_Вернуться к списку_](#goBack)

### <a id="init">init</a>

```javascript
// Установка хранилища

init{
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});
```

[_Вернуться к списку_](#goBack)

### <a id="client">Client</a>

```javascript
        timeout: "number",
        userName: "string",
        password: "string",
        willMessage: "object",
        keepAliveInterval: "number",
        cleanSession: "boolean",
        useSSL: "boolean",
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        hosts: "object",
        ports: "object",
        reconnect: "boolean",
        mqttVersion: "number",
        mqttVersionExplicit: "boolean",
        uris: "object"
  /**
   * CLIENT
   * The JavaScript application communicates to the server using a {@link Paho.MQTT.Client} object.
   * <p>
   * Most applications will create just one Client object and then call its connect() method,
   * however applications can create more than one Client object if they wish.
   * In this case the combination of host, port and clientId attributes must be different for each Client object.
   * <p>
   * The send, subscribe and unsubscribe methods are implemented as asynchronous JavaScript methods
   * (even though the underlying protocol exchange might be synchronous in nature).
   * This means they signal their completion by calling back to the application,
   * via Success or Failure callback functions provided by the application on the method in question.
   * Such callbacks are called at most once per method invocation and do not persist beyond the lifetime
   * of the script that made the invocation.
   * <p>
   * In contrast there are some callback functions, most notably <i>onMessageArrived</i>,
   * that are defined on the {@link Paho.MQTT.Client} object.
   * These may get called multiple times, and aren't directly related to specific method invocations made by the client.
   *
 * @name Paho.MQTT.Client
   *
   * @constructor
   *
   * @param {string} host - the address of the messaging server, as a fully qualified WebSocket URI, as a DNS name or dotted decimal IP address.
   * @param {number} port - the port number to connect to - only required if host is not a URI
   * @param {string} path - the path on the host to connect to - only used if host is not a URI. Default: '/mqtt'.
   * @param {string} clientId - the Messaging client identifier, between 1 and 23 characters in length.
   *
   * @property {string} host - <i>read only</i> the server's DNS hostname or dotted decimal IP address.
   * @property {number} port - <i>read only</i> the server's port.
   * @property {string} path - <i>read only</i> the server's path.
   * @property {string} clientId - <i>read only</i> used when connecting to the server.
   * @property {function} onConnectionLost - called when a connection has been lost.
   *                            after a connect() method has succeeded.
   *                            Establish the call back used when a connection has been lost. The connection may be
   *                            lost because the client initiates a disconnect or because the server or network
   *                            cause the client to be disconnected. The disconnect call back may be called without
   *                            the connectionComplete call back being invoked if, for example the client fails to
   *                            connect.
   *                            A single response object parameter is passed to the onConnectionLost callback containing the following fields:
   *                            <ol>
   *                            <li>errorCode
   *                            <li>errorMessage
   *                            </ol>
   * @property {function} onMessageDelivered - called when a message has been delivered.
   *                            All processing that this Client will ever do has been completed. So, for example,
   *                            in the case of a Qos=2 message sent by this client, the PubComp flow has been received from the server
   *                            and the message has been removed from persistent storage before this callback is invoked.
   *                            Parameters passed to the onMessageDelivered callback are:
   *                            <ol>
   *                            <li>{@link Paho.MQTT.Message} that was delivered.
   *                            </ol>
   * @property {function} onMessageArrived - called when a message has arrived in this Paho.MQTT.client.
   *                            Parameters passed to the onMessageArrived callback are:
   *                            <ol>
   *                            <li>{@link Paho.MQTT.Message} that has arrived.
   *                            </ol>
   * @property {function} onConnected - called when a connection is successfully made to the server.
   *                                  after a connect() method.
   *                                  Parameters passed to the onConnected callback are:
   *                                  <ol>
   *                                  <li>reconnect (boolean) - If true, the connection was the result of a reconnect.</li>
   *                                  <li>URI (string) - The URI used to connect to the server.</li>
   *                                  </ol>
   * @property {boolean} disconnectedPublishing - if set, will enable disconnected publishing in
   *                                            in the event that the connection to the server is lost.
   * @property {number} disconnectedBufferSize - Used to set the maximum number of messages that the disconnected
   *                                             buffer will hold before rejecting new messages. Default size: 5000 messages
   * @property {function} trace - called whenever trace is called. TODO
```

[_Вернуться к списку_](#goBack)

### <a id="connect">Connect</a>

```javascript
/**
 * CONNECT
 * Connect this Messaging client to its server.
 *
 * @name Paho.MQTT.Client#connect
 * @function
 * @param {object} connectOptions - Attributes used with the connection.
 * @param {number} connectOptions.timeout - If the connect has not succeeded within this
 *                    number of seconds, it is deemed to have failed.
 *                    The default is 30 seconds.
 * @param {string} connectOptions.userName - Authentication username for this connection.
 * @param {string} connectOptions.password - Authentication password for this connection.
 * @param {Paho.MQTT.Message} connectOptions.willMessage - sent by the server when the client
 *                    disconnects abnormally.
 * @param {number} connectOptions.keepAliveInterval - the server disconnects this client if
 *                    there is no activity for this number of seconds.
 *                    The default value of 60 seconds is assumed if not set.
 * @param {boolean} connectOptions.cleanSession - if true(default) the client and server
 *                    persistent state is deleted on successful connect.
 * @param {boolean} connectOptions.useSSL - if present and true, use an SSL Websocket connection.
 * @param {object} connectOptions.invocationContext - passed to the onSuccess callback or onFailure callback.
 * @param {function} connectOptions.onSuccess - called when the connect acknowledgement
 *                    has been received from the server.
 * A single response object parameter is passed to the onSuccess callback containing the following fields:
 * <ol>
 * <li>invocationContext as passed in to the onSuccess method in the connectOptions.
 * </ol>
 * @param {function} connectOptions.onFailure - called when the connect request has failed or timed out.
 * A single response object parameter is passed to the onFailure callback containing the following fields:
 * <ol>
 * <li>invocationContext as passed in to the onFailure method in the connectOptions.
 * <li>errorCode a number indicating the nature of the error.
 * <li>errorMessage text describing the error.
 * </ol>
 * @param {array} connectOptions.hosts - If present this contains either a set of hostnames or fully qualified
 * WebSocket URIs (ws://iot.eclipse.org:80/ws), that are tried in order in place
 * of the host and port paramater on the construtor. The hosts are tried one at at time in order until
 * one of then succeeds.
 * @param {array} connectOptions.ports - If present the set of ports matching the hosts. If hosts contains URIs, this property
 * is not used.
 * @param {boolean} connectOptions.reconnect - Sets whether the client will automatically attempt to reconnect
 * to the server if the connection is lost.
 *<ul>
 *<li>If set to false, the client will not attempt to automatically reconnect to the server in the event that the
 * connection is lost.</li>
 *<li>If set to true, in the event that the connection is lost, the client will attempt to reconnect to the server.
 * It will initially wait 1 second before it attempts to reconnect, for every failed reconnect attempt, the delay
 * will double until it is at 2 minutes at which point the delay will stay at 2 minutes.</li>
 *</ul>
 * @param {number} connectOptions.mqttVersion - The version of MQTT to use to connect to the MQTT Broker.
 *<ul>
 *<li>3 - MQTT V3.1</li>
 *<li>4 - MQTT V3.1.1</li>
 *</ul>
 * @param {boolean} connectOptions.mqttVersionExplicit - If set to true, will force the connection to use the
 * selected MQTT Version or will fail to connect.
 * @param {array} connectOptions.uris - If present, should contain a list of fully qualified WebSocket uris
 * (e.g. ws://iot.eclipse.org:80/ws), that are tried in order in place of the host and port parameter of the construtor.
 * The uris are tried one at a time in order until one of them succeeds. Do not use this in conjunction with hosts as
 * the hosts array will be converted to uris and will overwrite this property.
 * @throws {InvalidState} If the client is not in disconnected state. The client must have received connectionLost
 * or disconnected before calling connect for a second or subsequent time.
 */
```

[_Вернуться к списку_](#goBack)

### <a id="subscribe">Subscribe</a>

```javascript
        qos: "number",
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        timeout: "number"
/**
 * SUBSCRIBE
 * Subscribe for messages, request receipt of a copy of messages sent to the destinations described by the filter.
 *
 * @name Paho.MQTT.Client#subscribe
 * @function
 * @param {string} filter describing the destinations to receive messages from.
 * <br>
 * @param {object} subscribeOptions - used to control the subscription
 *
 * @param {number} subscribeOptions.qos -
 *          0 = не более одного раза: отправитель пересылает сообщение получателю и забывает об этом. Сообщения могут быть потеряны в канале связи или *         продублированы (если отправитель посчитал что пакет потерян и отправил его повторно, но первый пакет таки дошёл до получателя).
            1 = по крайней мере один раз: получатель подтверждает доставку сообщения. Если подтверждение не было получено, отправитель должен отправить его еще раз и так до получения подтверждения о получении. Сообщения могут дублироваться, но доставка гарантирована
            2 = ровно один раз: сервер обеспечивает гарантированную доставку. Сообщения поступают точно один раз без потери или дублирования. Самый медленный и машинотрудозатратный вариант, так как отправитель и получатель дополнительно обмениваются подтверждениями.
 * @param {object} subscribeOptions.invocationContext - passed to the onSuccess callback
 *                                  or onFailure callback.
 * @param {function} subscribeOptions.onSuccess - called when the subscribe acknowledgement
 *                                  has been received from the server.
 *                                  A single response object parameter is passed to the onSuccess callback containing the following fields:
 *                                  <ol>
 *                                  <li>invocationContext if set in the subscribeOptions.
 *                                  </ol>
 * @param {function} subscribeOptions.onFailure - called when the subscribe request has failed or timed out.
 *                                  A single response object parameter is passed to the onFailure callback containing the following fields:
 *                                  <ol>
 *                                  <li>invocationContext - if set in the subscribeOptions.
 *                                  <li>errorCode - a number indicating the nature of the error.
 *                                  <li>errorMessage - text describing the error.
 *                                  </ol>
 * @param {number} subscribeOptions.timeout - which, if present, determines the number of
 *                                  seconds after which the onFailure calback is called.
 *                                  The presence of a timeout does not prevent the onSuccess
 *                                  callback from being called when the subscribe completes.
 * @throws {InvalidState} if the client is not in connected state.
 */
```

[_Вернуться к списку_](#goBack)

### <a id="unsubscribe">Unsubscribe</a>

```javascript
        invocationContext: "object",
        onSuccess: "function",
        onFailure: "function",
        timeout: "number"
/**
 * UNSUBSCRIBE
   * Unsubscribe for messages, stop receiving messages sent to destinations described by the filter.
   *
   * @name Paho.MQTT.Client#unsubscribe
   * @function
   * @param {string} filter - describing the destinations to receive messages from.
   * @param {object} unsubscribeOptions - used to control the subscription
   * @param {object} unsubscribeOptions.invocationContext - passed to the onSuccess callback
                                        or onFailure callback.
   * @param {function} unsubscribeOptions.onSuccess - called when the unsubscribe acknowledgement has been received from the server.
   *                                    A single response object parameter is passed to the
   *                                    onSuccess callback containing the following fields:
   *                                    <ol>
   *                                    <li>invocationContext - if set in the unsubscribeOptions.
   *                                    </ol>
   * @param {function} unsubscribeOptions.onFailure called when the unsubscribe request has failed or timed out.
   *                                    A single response object parameter is passed to the onFailure callback containing the following fields:
   *                                    <ol>
   *                                    <li>invocationContext - if set in the unsubscribeOptions.
   *                                    <li>errorCode - a number indicating the nature of the error.
   *                                    <li>errorMessage - text describing the error.
   *                                    </ol>
   * @param {number} unsubscribeOptions.timeout - which, if present, determines the number of seconds
   *                                    after which the onFailure callback is called. The presence of
   *                                    a timeout does not prevent the onSuccess callback from being
   *                                    called when the unsubscribe completes
   * @throws {InvalidState} if the client is not in connected state.
   */
```

[_Вернуться к списку_](#goBack)

### <a id="send">Send</a>

```javascript
/**
 * SEND
 * Send a message to the consumers of the destination in the Message.
 *
 * @name Paho.MQTT.Client#send
 * @function
 * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the destination to which the message is to be sent.
 *         - If it is the only parameter, used as Paho.MQTT.Message object.
 * @param {String|ArrayBuffer} payload - The message data to be sent.
 * @param {number} qos The Quality of Service used to deliver the message.
 *   <dl>
 *    <dt>0 Best effort (default).
 *        <dt>1 At least once.
 *        <dt>2 Exactly once.
 *   </dl>
 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
 *                     to both current and future subscriptions.
 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
 *                     A received message has the retained boolean set to true if the message was published
 *                     with the retained boolean set to true
 *                     and the subscrption was made after the message has been published.
 * @throws {InvalidState} if the client is not connected.
 */
```

[_Вернуться к списку_](#goBack)

### <a id="Publicsh">Publicsh</a>

```javascript
/**
 * PUBLISH
 * Publish a message to the consumers of the destination in the Message.
 * Synonym for Paho.Mqtt.Client#send
 *
 * @name Paho.MQTT.Client#publish
 * @function
 * @param {string|Paho.MQTT.Message} topic - <b>mandatory</b> The name of the topic to which the message is to be published.
 *         - If it is the only parameter, used as Paho.MQTT.Message object.
 * @param {String|ArrayBuffer} payload - The message data to be published.
 * @param {number} qos The Quality of Service used to deliver the message.
 *   <dl>
 *    <dt>0 Best effort (default).
 *        <dt>1 At least once.
 *        <dt>2 Exactly once.
 *   </dl>
 * @param {Boolean} retained If true, the message is to be retained by the server and delivered
 *                     to both current and future subscriptions.
 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
 *                     A received message has the retained boolean set to true if the message was published
 *                     with the retained boolean set to true
 *                     and the subscrption was made after the message has been published.
 * @throws {InvalidState} if the client is not connected.
 */
```

[_Вернуться к списку_](#goBack)

### <a id="Disconnect">Disconnect</a>

```javascript
/**
 * DISCONNECT
 * Normal disconnect of this Messaging client from its server.
 *
 * @name Paho.MQTT.Client#disconnect
 * @function
 * @throws {InvalidState} if the client is already disconnected.
 */
this.disconnect = function () {
  client.disconnect();
};
```

[_Вернуться к списку_](#goBack)

### <a id="GetTraceLog">GetTraceLog</a>

```javascript
/**
 * GETTRACELOG
 * Get the contents of the trace log.
 *
 * @name Paho.MQTT.Client#getTraceLog
 * @function
 * @return {Object[]} tracebuffer containing the time ordered trace records.
 */
this.getTraceLog = function () {
  return client.getTraceLog();
};
```

[_Вернуться к списку_](#goBack)

### <a id="StartTrace">StartTrace</a>

```javascript
/**
 * STARTTRACE
 * Start tracing.
 *
 * @name Paho.MQTT.Client#startTrace
 * @function
 */
this.startTrace = function () {
  client.startTrace();
};
```

[_Вернуться к списку_](#goBack)

### <a id="StopTrace">StopTrace</a>

```javascript
/**
 * Stop tracing.
 *
 * @name Paho.MQTT.Client#stopTrace
 * @function
 */
this.stopTrace = function () {
  client.stopTrace();
};
```

[_Вернуться к списку_](#goBack)

### <a id="IsConnected">IsConnected</a>

```javascript
this.isConnected = function () {
  return client.connected;
};
```

[_Вернуться к списку_](#goBack)

### <a id="Message">Message</a>

```javascript
/**
 * MESSAGE
 * An application message, sent or received.
 * <p>
 * All attributes may be null, which implies the default values.
 *
 * @name Paho.MQTT.Message
 * @constructor
 * @param {String|ArrayBuffer} payload The message data to be sent.
 * <p>
 * @property {string} payloadString <i>read only</i> The payload as a string if the payload consists of valid UTF-8 characters.
 * @property {ArrayBuffer} payloadBytes <i>read only</i> The payload as an ArrayBuffer.
 * <p>
 * @property {string} destinationName <b>mandatory</b> The name of the destination to which the message is to be sent
 *                    (for messages about to be sent) or the name of the destination from which the message has been received.
 *                    (for messages received by the onMessage function).
 * <p>
 * @property {number} qos The Quality of Service used to deliver the message.
 * <dl>
 *     <dt>0 Best effort (default).
 *     <dt>1 At least once.
 *     <dt>2 Exactly once.
 * </dl>
 * <p>
 * @property {Boolean} retained If true, the message is to be retained by the server and delivered
 *                     to both current and future subscriptions.
 *                     If false the server only delivers the message to current subscribers, this is the default for new Messages.
 *                     A received message has the retained boolean set to true if the message was published
 *                     with the retained boolean set to true
 *                     and the subscrption was made after the message has been published.
 * <p>
 * @property {Boolean} duplicate <i>read only</i> If true, this message might be a duplicate of one which has already been received.
 *                     This is only set on messages received from the server.
 *
 */
```

[_Вернуться к списку_](#goBack)

### <a id="Errors">Errors</a>

```javascript
/**
 * Unique message type identifiers, with associated
 * associated integer values.
 * @private
 */
var ERROR = {
  OK: { code: 0, text: "AMQJSC0000I OK." },
  CONNECT_TIMEOUT: { code: 1, text: "AMQJSC0001E Connect timed out." },
  SUBSCRIBE_TIMEOUT: { code: 2, text: "AMQJS0002E Subscribe timed out." },
  UNSUBSCRIBE_TIMEOUT: { code: 3, text: "AMQJS0003E Unsubscribe timed out." },
  PING_TIMEOUT: { code: 4, text: "AMQJS0004E Ping timed out." },
  INTERNAL_ERROR: {
    code: 5,
    text: "AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}",
  },
  CONNACK_RETURNCODE: {
    code: 6,
    text: "AMQJS0006E Bad Connack return code:{0} {1}.",
  },
  SOCKET_ERROR: { code: 7, text: "AMQJS0007E Socket error:{0}." },
  SOCKET_CLOSE: { code: 8, text: "AMQJS0008I Socket closed." },
  MALFORMED_UTF: {
    code: 9,
    text: "AMQJS0009E Malformed UTF data:{0} {1} {2}.",
  },
  UNSUPPORTED: {
    code: 10,
    text: "AMQJS0010E {0} is not supported by this browser.",
  },
  INVALID_STATE: { code: 11, text: "AMQJS0011E Invalid state {0}." },
  INVALID_TYPE: { code: 12, text: "AMQJS0012E Invalid type {0} for {1}." },
  INVALID_ARGUMENT: {
    code: 13,
    text: "AMQJS0013E Invalid argument {0} for {1}.",
  },
  UNSUPPORTED_OPERATION: {
    code: 14,
    text: "AMQJS0014E Unsupported operation.",
  },
  INVALID_STORED_DATA: {
    code: 15,
    text: "AMQJS0015E Invalid data in local storage key={0} value={1}.",
  },
  INVALID_MQTT_MESSAGE_TYPE: {
    code: 16,
    text: "AMQJS0016E Invalid MQTT message type {0}.",
  },
  MALFORMED_UNICODE: {
    code: 17,
    text: "AMQJS0017E Malformed Unicode string:{0} {1}.",
  },
  BUFFER_FULL: {
    code: 18,
    text: "AMQJS0018E Message buffer is full, maximum buffer size: {0}.",
  },
};

/** CONNACK RC Meaning. */
var CONNACK_RC = {
  0: "Connection Accepted",
  1: "Connection Refused: unacceptable protocol version",
  2: "Connection Refused: identifier rejected",
  3: "Connection Refused: server unavailable",
  4: "Connection Refused: bad user name or password",
  5: "Connection Refused: not authorized",
};

/**
 * Format an error message text.
 * @private
 * @param {error} ERROR.KEY value above.
 * @param {substitutions} [array] substituted into the text.
 * @return the text with the substitutions made.
 */
```

[_Вернуться к списку_](#goBack)
