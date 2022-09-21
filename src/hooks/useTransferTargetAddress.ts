import { useMemo } from "react";

export default function useTransferTargetAddressHex() {
  const targetAddressHex = "Address"
  const hexToUint8Array = (hexs: string) => {
    var bytes = new Uint8Array(Math.ceil(hexs.length / 2));
    for (var i = 0; i < bytes.length; i++) bytes[i] = parseInt(hexs.substr(i * 2, 2), 16);
    return bytes;
  }

  const targetAddress = useMemo(
    () => (targetAddressHex ? hexToUint8Array(targetAddressHex) : undefined),
    [targetAddressHex]
  );
  return targetAddress;
}
