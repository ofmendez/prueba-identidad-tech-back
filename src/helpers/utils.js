export const myAtob = (b64txt) => {
  const buff = Buffer.from(b64txt, 'base64');
  const txt = buff.toString('utf-8');
  return txt;
};
