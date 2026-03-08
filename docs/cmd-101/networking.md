# Networking

- IP
- Host and domain name
- URI: URL and URN

## Examining and Monitoring a Network

### `ping`

The `ping` command sends a special network packet called an **ICMP ECHO_REQUEST** to a specified host. Most network devices receiving this packet will reply to it, allowing the network connection to be verified.

> [ICMP: Internet Control Message Protocol](https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol)

After it is interrupted by pressing `Ctrl-C`, ping prints performance statistics.

```bash
$ ping linuxcommand.org
PING linuxcommand.org (216.105.38.11): 56 data bytes
64 bytes from 216.105.38.11: icmp_seq=0 ttl=42 time=137.667 ms
64 bytes from 216.105.38.11: icmp_seq=1 ttl=42 time=137.371 ms
64 bytes from 216.105.38.11: icmp_seq=2 ttl=42 time=140.880 ms
64 bytes from 216.105.38.11: icmp_seq=3 ttl=42 time=138.153 ms
64 bytes from 216.105.38.11: icmp_seq=4 ttl=42 time=139.122 ms
64 bytes from 216.105.38.11: icmp_seq=5 ttl=42 time=140.995 ms
^C
--- linuxcommand.org ping statistics ---
6 packets transmitted, 6 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 137.371/139.031/140.995/1.453 ms
```

**👉 Round-trip (latency) time (RTT)** of the ICMP **ECHO_REQUEST** and **ECHO_REPLY** messages sent by the ping command.

### `traceroute`

The `traceroute` program lists all the “hops” network traffic takes to get from the local system to a specified host.

> [Hop](https://en.wikipedia.org/wiki/Hop\_\\(networking\\)): a hop occurs when a packet is passed from one network segment to the next.

```bash
$ traceroute slashdot.org
traceroute: Warning: slashdot.org has multiple addresses; using 104.18.4.215
traceroute to slashdot.org (104.18.4.215), 64 hops max, 40 byte packets
 1  tuf-be3600-ff50 (192.168.50.1)  5.601 ms  2.758 ms  2.157 ms
 2  192.168.1.1 (192.168.1.1)  3.236 ms  4.191 ms  3.222 ms
 3  58-115-53-254.twt1.com.tw (58.115.53.254)  8.481 ms  15.479 ms  9.176 ms
 4  192.168.8.38 (192.168.8.38)  5.159 ms  5.964 ms  5.170 ms
 5  192.168.8.110 (192.168.8.110)  5.281 ms
    192.168.6.110 (192.168.6.110)  5.935 ms
    192.168.8.114 (192.168.8.114)  5.838 ms
 6  192.168.7.10 (192.168.7.10)  6.409 ms
    twt-br93-eth1-1-oem.ix.kbtelecom.net (203.187.22.173)  5.983 ms
    192.168.7.10 (192.168.7.10)  5.307 ms
 7  chander-x68-1-po13-twt.ix.kbtelecom.net (203.187.9.241)  4.901 ms
    twt-br93-eth1-1-oem.ix.kbtelecom.net (203.187.22.173)  5.382 ms
    chander-x68-1-po13-twt.ix.kbtelecom.net (203.187.9.241)  4.972 ms
 8  chander-br93-2-eth1-5-x68-1.ix.kbtelecom.net (203.187.23.253)  5.765 ms
    chander-x68-1-po13-twt.ix.kbtelecom.net (203.187.9.241)  7.270 ms
    chander-br93-2-eth1-5-x68-1.ix.kbtelecom.net (203.187.23.253)  5.589 ms
 9  chander-br93-2-eth1-5-x68-1.ix.kbtelecom.net (203.187.23.253)  5.573 ms
    tpnoc1-nc93-vl105-chander.ix.kbtelecom.net (203.187.9.5)  5.552 ms
    chander-br93-2-eth1-5-x68-1.ix.kbtelecom.net (203.187.23.253)  5.334 ms
10  tpnoc1-mkii-sc93-eth1-54-nc93.ix.kbtelecom.net (203.187.6.118)  5.789 ms
    tpnoc1-nc93-vl105-chander.ix.kbtelecom.net (203.187.9.5)  6.681 ms
    tpnoc1-mkii-sc93-eth1-54-nc93.ix.kbtelecom.net (203.187.6.118)  6.989 ms
11  tpnoc1-mkii-sc93-eth1-54-nc93.ix.kbtelecom.net (203.187.6.118)  5.549 ms
    chinglian-br93-2-vl734-tpnoc1-mkii.ix.kbtelecom.net (203.187.9.254)  13.053 ms
    tpnoc1-mkii-sc93-eth1-54-nc93.ix.kbtelecom.net (203.187.6.118)  6.464 ms
12  chinglian-cloudflare-kbt.ix.homeplus.net.tw (203.133.92.142)  10.142 ms
    chinglian-br93-2-vl734-tpnoc1-mkii.ix.kbtelecom.net (203.187.9.254)  13.529 ms
    chinglian-cloudflare-kbt.ix.homeplus.net.tw (203.133.92.142)  26.833 ms
13  chinglian-cloudflare-kbt.ix.homeplus.net.tw (203.133.92.142)  9.945 ms  10.168 ms
    104.18.4.215 (104.18.4.215)  9.883 ms
```

For routers that do not provide identifying information (because of router configuration, network congestion, firewalls, etc.), we see asterisks.

❓ How `traceroute` implements? 👉 <https://en.wikipedia.org/wiki/Traceroute>

### `ip`

The `ip` program is **a multi-purpose network configuration tool** that makes use of the full

range networking of features available in modern Linux kernels. It replaces the earlier

and now deprecated `ifconfig` program. (For mac, it still use `ifconfig`)

#### Linux

```bash
$ ip a
```

#### Mac

```bash
$ ifconfig
```

### `netstate`

The `netstat` program is used to examine various network settings and statistics. On Linux, `netstat` (part of "net-tools") is superseded by `ss` (part of iproute2). The replacement for `netstat -r` is `ip route`, the replacement for `netstat -i` is `ip -s link`, and the replacement for `netstat -g` is `ip maddr`, all of which are recommended instead.

See more: <https://en.wikipedia.org/wiki/Netstat>

## Transporting Files Over a Network

### `wget`

`wget` is useful for downloading content from both web and FTP sites. Single files, multiple files, and even entire sites can be downloaded.

```bash
$ wget [OPTION]... [URL]...
```

```bash
$ wget http://linuxcommand.org/index.php
```

### `[curl](https://curl.se)`

`curl` is used in command lines or scripts to transfer data.

```bash
$ curl [OPTION]... [URL]...
```

```bash
$ curl http://linuxcommand.org/index.php
```

## Secure Communication with Remote Hosts

### `ssh`

SSH is a protocol used to solves the problems of secure communication with a remote host.

[Asymmetric Encryption - Simply explained](https://youtu.be/AQDCe585Lnc?si=7eNbZgcHnHtSeocO)

[SSH Keys](https://youtu.be/dPAw4opzN9g?si=BW1QPrmHCRbBJnHx)

[SSH explained in 2 minutes!](https://youtu.be/P0Fk-K2eZF8?si=oPMB5LXgEEJIk8UE)

[How SSH Really Works](https://youtu.be/rlMfRa7vfO8?si=mPx0zYnhNyY9qy7b)

**SSH server**: The remote host listening for incoming connections on port 22 (by default). To enable a system to receive remote connections, it must have the `OpenSSH-server` package installed, configured and running, and (if the system either is running or is behind a firewall) it must allow incoming network connections on TCP port 22.

**SSH client**: The local system to communicate with the remote server, The SSH client program used to connect to remote SSH servers is called, appropriately enough, `ssh`.

```bash
$ ssh [REMOTE_SYSTEM]
```

Once the connection is established and the identity is authenticated, a shell prompt from the remote system is received. The remote shell session continues until the user enters the `exit` command at the remote shell prompt, thereby closing the remote connection. At this point, the local shell session resumes, and the local shell prompt reappears.

Besides opening a shell session on a remote system, ssh allows us to execute a single command on a remote system.

```bash
$ ssh [REMOTE_SYSTEM] [COMMAND]
```

Some example:

```bash
$ ssh remote-sys 'ls *' > dirlist.txt
```

### `scp`

`scp` means “secure copy protocol“. The command make the use of an SSH-encrypted tunnel to copy files across the network.

```bash
$ scp [OPTIONS] [SOURCE] [DESTINATION]
```

```bash
$ scp /path/to/local/file username@remote_host:/path/to/remote/directory
```

```bash
$ scp username@remote_host:/path/to/remote/file /path/to/local/directory
```