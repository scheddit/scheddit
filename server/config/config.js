// CONFIG
// ======

exports.config = {
  listenPort: "3000",
  sessionSecret: "team-scheddit",
  database: {
    IP: "ec2-54-200-150-74.us-west-2.compute.amazonaws.com",
    name: "schedditdb",
    port: "27017"
  }
};