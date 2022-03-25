export async function connectBT(setWeight) {
  try {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['bca881ce-42c0-444d-91f4-b31e9acc667c'] }],
    });
    console.log(device);
    const connect = await device.gatt.connect();
    console.log(connect);
    const service = await device.gatt.getPrimaryService(
      'bca881ce-42c0-444d-91f4-b31e9acc667c'
    );
    console.log(service);
    const characteristic = await service.getCharacteristic(
      'c40d35b1-9bcd-401f-b5ee-8abf58dab24b'
    );
    console.log(characteristic);
    const notifs = await characteristic.startNotifications();
    setInterval(() => {
      const value = notifs.value.buffer;
      console.log(notifs);
      console.log(value);
      var enc = new TextDecoder('utf-8');
      console.log(enc.decode(value));
      const json = JSON.parse(enc.decode(value));
      console.log(json);
      setWeight(json.pounds);
    }, 200);
  } catch (error) {
    console.error(error);
  }
}

export async function disconnectBT() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ['bca881ce-42c0-444d-91f4-b31e9acc667c'] }],
  });
  console.log(device);
  const disconnect = await device.gatt.disconnect();
}
