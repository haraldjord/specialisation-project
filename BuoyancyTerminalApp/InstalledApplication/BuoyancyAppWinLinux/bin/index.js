#!/usr/bin/env node

NODE_NO_WARNINGS = 1                                      /**< Disable runtime warnings */
const noble = require('noble');                           /**<  To Handle BLE*/
const argv = require('minimist')(process.argv.slice(2));  /**<  To handle input argument: BLE name - Buoyancy Vehicle*/
const fs = require('fs');                                 /**<  To handle files*/
const readline = require('readline');                     /**<  To write tekst when application is running*/
const path = require('path');

const rl = readline.createInterface({         /**<  Input and output streams  to and from terminal respectively*/
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var deviceName;

/**< Provide target device name as argument*/
if (argv._.length != 1) {
    printHelp();
    deviceName = 'buoyancy';
}else{
    deviceName = argv._[0].toLowerCase();
}
/**< Optionally provide the service UUID with -serviceUUID "xxxx...xxxx"*/
var serviceUUID = (argv.serviceUUID && argv.serviceUUID.split(',')) || ["6e400001b5a3f393e0a9e50e24dcca9e"];

/**< Optionally provide the rx/tx UUIDs with comma-separated -characteristicUUID "xxxx...xxxx","xxxx...xxxx"*/
var characteristicUUIDs = (argv.charUUIDs && argv.charUUIDs.split(',')) || [];

/**< On state 'PoweredOn' the app start scanning for specified device
*/
noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        console.log(`Scanning for ${deviceName}... (Type 'quit' to stop)`);
        noble.startScanning();
    } else {
        console.log('Scanning stopped - is Bluetooth adapter connected / turned on?');
        noble.stopScanning();
    }
});

/**< When device is discovered the app stop scanning for devices and connect the discovered peripheral to UART */
noble.on('discover', function(peripheral) {
    var advertisement = peripheral.advertisement;
    var localName = advertisement.localName;

    if (localName && localName.toLowerCase() == deviceName) {
        noble.stopScanning();

        console.log(`Connected to ${deviceName}!`);
        console.log(`(Type 'quit' to disconnect)`);
        console.log();

        connectToUart(peripheral);
    }
});

var uartReadChar = null;  /**<  Read from peripheral characteristic*/
var uartWriteChar = null; /**<  Write to peripheral characteristic*/
const buoyancyAppDir = path.join('.', '..','BuoyancyApp');
const missionLogDir  = path.join(buoyancyAppDir, 'MissionLog'); /**< Transfered missionLog files are stored in folder path: './Documents/BuoyancyLog/missionLog' */

function connectToUart(peripheral) {
        
    if (!fs.existsSync(buoyancyAppDir)) {        
        fs.mkdirSync(buoyancyAppDir);
    }if (!fs.existsSync(missionLogDir)) {  /**< Create the path: './Documents/BuoyancyLog/missionLog' if it does not exist*/        
      fs.mkdirSync(missionLogDir);
  }

    fs.opendir(missionLogDir, (err, dir) => {
        if (err) {
            /**< log and return if error*/
            console.error(err)
            return
        }
        /**< On 'disconnect' event start scanning for device */
        peripheral.once('disconnect', function() {
            console.log();
            console.log(`Disconnected. Scanning for ${deviceName}...`);

            uartReadChar = null;
            uartWriteChar = null;
            noble.startScanning();
        });
        
        /**< Connect to peripheral */
        peripheral.connect(function(err) {
            peripheral.discoverSomeServicesAndCharacteristics(
                serviceUUID,
                characteristicUUIDs, 
                function(err, services, characteristics) {
                    for(i=0; i<characteristics.length; i++) {
                        var char = characteristics[i];
                        if (char.properties.includes('notify')) { /**< If notification is enabled, read character fron Nordic UART Service */
                            uartReadChar = char;
                            
                            uartReadChar.subscribe(function(err) {
                                if (err) {
                                    console.error(`Failed to subscribe to read characteristic: ${err}`);
                                }
                            });
                            
                            var transfer = false; /**< Flag to notify app of file transmission */
                            var byteCnt = 0;      /**< Counter for number of bytes transfered, during file transmission */
                            var writestream;      /**< Writestream instance, for writing trasnfered bytes to local file */
                            
                            uartReadChar.on('data', function(data) {   /**< Incoming data from BLE*/
                                
                                var Msg = data.toString('utf-8');
                                
                                if(Msg[0] === '/'){ /**< First character of received message is '/' indicate the start of a new file transmission */

                                    byteCnt = 0;
                                    var filename = Msg.split('/');
                                    var filepath = path.join(missionLogDir, filename[1]); /**< A new local file is created with the same filename as the transfered file*/
                                    console.log(filepath);
                                    if (fs.existsSync(filepath)) {
                                        writestream = fs.createWriteStream(path.join(missionLogDir,`new.${filename[1]}`));             // Create file    
                                    }else{
                                        writestream = fs.createWriteStream(filepath);             // Create file 
                                    }
                                    transfer = true;

                                }else if(Msg === "##"){ /**< "##" indicate the ed of current file transmission */
                                console.log('');
                                transfer = false;
                                }
                                
                                if(transfer == true && Msg[0] != '/'){
                                    
                                    writestream.write(data, 'utf-8', err)    /**< Write incoming BLE data to file*/                      /**< Write incoming BLE data to file*/
                                    byteCnt += data.length;
                                    process.stdout.write("Bytes transfered: " + byteCnt + "\r");/**< Print the number of bytes received on current file transmission*/
                                }else {
                                    console.log(Msg);      /**< Write incoming BLE data to terminal, while not transfering file*/
                                }
                                
                                if(err) console.error(`Failed to write data to file: ${err}`);
                            });
                        }
                        else if (char.properties.includes('write')) {
                            uartWriteChar = char;
                        }
                    }
                }
            );
        });
    });
}
var buffer = null;
var msg = null;
var stringArray = null;
var reverseArray = null;

if (process.stdin.isTTY && process.stdout.isTTY) {
  process.stdin.setRawMode(false); 


    /**< Asyncronously quit application */ 
   rl.question('', (message) => {

    
    if(message === "quit"){  
      rl.close();
      process.exit(0);
    }

    buffer = Buffer.from(message,'utf-8');
    if (uartWriteChar) {  /**<  If Characteristic allow WRITE then write to peripheral UART serivce */
      uartWriteChar.write(buffer, false, function(err) {
        process.stdout.write("\n\n");
        
        if (err) {
          console.error(`Failed to write data to write characteristic: ${err}`);
        }
      });
    }
  });



  process.stdin.on('data', function(data){
    if (data) {
      if(data === "quit"){ /**< Quit application by writing "quit" */
        rl.close();
        process.exit(0);
      }

      /**< Print text, and store answer in string variables that's sent to BLE
      */ 
      rl.question('', (message) => {
        if(message === "quit"){  /**< Quit application by writing "quit" */
          rl.close();
          process.exit(0);
        }
        buffer = Buffer.from(message,'utf-8');
        if (uartWriteChar) {  /**<  If Characteristic allow WRITE then write to peripheral UART serivce */
          uartWriteChar.write(buffer, false, function(err) {
            process.stdout.write("\n\n");
            
            if (err) {
              console.error(`Failed to write data to write characteristic: ${err}`);
            }
          });
        }
      });
    }
  }); 
}

function printHelp() { /**< Help menu when no device name is specified */
  console.log('No device name specified. Scan for default device: buoyancy');
}