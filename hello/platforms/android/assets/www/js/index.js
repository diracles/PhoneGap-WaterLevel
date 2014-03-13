/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor

    loc: {
        x: 10,
        y: 10
    },

    initialize: function() {
        this.bindEvents();
        console.log("starting the gyro app");
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('click', this.resetScreen, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.watchAcceleration();
    },

    watchAcceleration: function() {
        function success(acceleration){
            app.clear();
            app.display('X ' + acceleration.x.toFixed(2));
            app.display('Y ' + acceleration.y.toFixed(2));
            app.display('Z ' + (acceleration.z - 9.80).toFixed(2));

            app.loc.x -= acceleration.x;
            app.loc.y -= acceleration.y;

            messageDiv.style.top = app.loc.y + '%';
            messageDiv.style.left = app.loc.x + '%';


        }

        function failure(error) {
            app.display('Accelerometer error');
            app.display(error);
        }

        var watchAccel = navigator.accelerometer.watchAcceleration(success, failure, {
            frequency: 100
        });
    },

    display: function(message) {
        var label = document.createTextNode(message),
            lineBreak = document.createElement("br");
        messageDiv.appendChild(lineBreak);
        messageDiv.appendChild(label);
    },

    clear: function() {
        messageDiv.innerHTML = "";
    },


    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
