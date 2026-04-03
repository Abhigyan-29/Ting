import dns from 'node:dns';

const host = '_mongodb._tcp.chatapp.dmhjvr0.mongodb.net';

dns.resolveSrv(host, (err, addresses) => {
  if (err) {
    console.error('SRV Resolution failed:', err);
    process.exit(1);
  }
  console.log('SRV Resolution succeeded:', addresses);
});
