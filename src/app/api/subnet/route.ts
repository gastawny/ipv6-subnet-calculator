interface SubnetInfo {
  subnetID: number;
  subnetAddress: string;
  hostAddressRange: {
    start: string;
    end: string;
  };
  notation: string;
}

export async function GET(req: Request) {
  const [{ block }, { nSubnets }] = req.url
    .split("?")[1]
    .split("&")
    .map((x) => {
      const [key, value] = x.split("=");

      return {
        [key]: decodeURI(value),
      };
    }) as any;

  const dec2hex = (decimal: number) => decimal.toString(16);

  const concatHex = (hex1: string, hex2: string) =>
    hex1.slice(0, -hex2.length) + hex2;

  const format2IPv6 = (hex: string) => hex.match(/.{1,4}/g)!.join(":");

  const abbreviateIPv6 = (ip: string) => {
    let ipArr = ip.split(":").filter((x) => x !== "");

    if (Number(ipArr[3]) == 0) ipArr = ipArr.slice(0, 3);
    if (Number(ipArr[2]) == 0 && ipArr.length == 3) ipArr = ipArr.slice(0, 2);
    if (Number(ipArr[1]) == 0 && ipArr.length == 2) ipArr = ipArr.slice(0, 1);

    if (ipArr[ipArr.length - 1][0] == "0")
      ipArr[ipArr.length - 1] = ipArr[ipArr.length - 1].replace(/^0+/, "");

    return ipArr.join(":") + "::";
  };

  function subnetCalculator(block: string, subnets: number) {
    const [blockStr, blockNumStr] = block.split("/");
    const blockNum = parseInt(blockNumStr);

    const subnetsArr: SubnetInfo[] = [];
    const maxSubnets = Math.pow(2, 64 - blockNum - subnets);

    const initialSubnet = blockStr.split("::")[0] + "000000000000";

    for (let i = 0; i < Math.pow(2, subnets); i++) {
      const base =
        format2IPv6(concatHex(initialSubnet, dec2hex(maxSubnets * i))) + "::";

      subnetsArr.push({
        subnetID: i + 1,
        subnetAddress: abbreviateIPv6(base),
        hostAddressRange: {
          start: abbreviateIPv6(base),
          end: abbreviateIPv6(
            format2IPv6(
              concatHex(initialSubnet, dec2hex(maxSubnets * (i + 1) - 1))
            )
          ),
        },
        notation: `${abbreviateIPv6(base)}/${blockNum + subnets}`,
      });
    }

    return subnetsArr;
  }

  const result = subnetCalculator(block, Number(nSubnets));

  console.log(result);

  return Response.json({
    map: req.url
    .split("?")[1]
    .split("&")
    .map((x) => {
      const [key, value] = x.split("=");

      return {
        [key]: value,
      };
    }),
    decoded: req.url
    .split("?")[1]
    .split("&")
    .map((x) => {
      const [key, value] = x.split("=");

      return {
        [key]: decodeURI(value),
      };
    }),
    semiMap: req.url.split("?")[1].split("&"),
    req: req.url,
    block: block,
    nSubnetsStr: nSubnets,
    nSubnets: Number(nSubnets),
    split: block.split("/"),
    parseInt: parseInt(block.split("/")[1]),
    maxSubnets: Math.pow(2, 64 - parseInt(block.split("/")[1]) - Number(nSubnets)),
  });
}
