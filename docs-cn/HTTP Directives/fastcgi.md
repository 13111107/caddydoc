# http.fastcgi
fastcgi代理请求到FastCGI服务器，尽管这个指令最常见的用法是为PHP站点提供服务，默认情况下是通用的FastCGI代理，该指令可以多次使用不同的请求路径。

## 语法
```
fastcgi path endpoint [preset] {
	root     directory
	ext      extension
	split    splitval
	index    indexfile
	env      key value
	except   ignored_paths...
	pool     pool_size
	upstream endpoint
	connect_timeout duration
	read_timeout    duration
	send_timeout    duration
}
```

*  **path** 是在请求转发之前匹配的基本路径。
endpoint is the address or Unix socket of the FastCGI server.
preset is an optional preset name (see below). You do not need to repeat a preset's individual settings when using a preset.
directory specifies the root directory used by the FastCGI server if different from the root directory of the virtual host. Useful if the FastCGI server is on a different server, chroot-jailed, and/or containerized.
ext specifies the extension which, if the request URL has it, would proxy the request to FastCGI.
split specifies how to split the URL; the split value becomes the end of the first part and anything in the URL after it becomes part of the PATH_INFO CGI variable.
index specifies the default file to try if a file is not specified by the URL.
env sets an environment variable named key with the given value; the env property can be used multiple times and values may use request placeholders.
except is a list of space-separated request paths to be excepted from fastcgi processing, even if it matches the base path.
pool is the number of persistent connections to reuse (can be good for performance on Windows); default is 0.
upstream specifies an additional backend to use. Basic load balancing will be performed. This can be specified multiple times.
connect_timeout is the time allowed for connecting to the backend. Must be a duration value (e.g. "10s").
read_timeout is the time allowed to read a response from the backend. Must be a duration value.
send_timeout is the time allowed to send a request to the backend. Must be a duration value.

## 预设
A preset is shorthand for a certain FastCGI configuration. These presets are available:
预设是一个快速的FastCGI配置，这些预置可用如下：

PHP简写为：

```
ext   .php
split .php
index index.php
```

You do not need to specify the individual configuration settings for a preset. However, you can overwrite its individual settings if needed by declaring them manually.
你不需要为预置指定单独的配置设置，但是，如果需要，可以手动声明它的单独设置。
您不需要为预设指定各个配置设置。 但是，如果需要，可以手动声明它们来覆盖其各个设置。

## 例子
在127.0.0.1:9000处理FastCGI响应的所有请求：
```
fastcgi / 127.0.0.1:9000
```

将/blog中的所有请求转发到php-fpm提供的PHP站点（如WordPress）：
```
fastcgi /blog/ 127.0.0.1:9000 php
```

使用自定义FastCGI配置：
```
fastcgi / 127.0.0.1:9001 {
	split .html
}
```
With PHP preset, but overriding the ext property:
使用PHP预设，但覆盖ext属性：

```
fastcgi / 127.0.0.1:9001 php {
	ext .html
}
```
With PHP preset, but the FastCGI server is running in a container based on an official Docker image (with container port 9000 published to 127.0.0.1:9001):

```
fastcgi / 127.0.0.1:9001 php {
	root /var/www/html
}
```