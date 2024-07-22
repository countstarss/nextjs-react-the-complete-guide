# 04:优化NextJS应用程序.md

## 1. 添加头部信息
- <Head> xxxxx </Head>


## 2. 添加动态的头部信息
- <Head> {event.xxxxx} </Head>

## 3. 添加可重用的头部信息
- 使用情况：在一个JSX文件中有多个返回，可能是因为捕捉某些错误或者其他原因，但是这些个页面也都想要头部信息的话，一个个复制就很麻烦，写一个可重用的头部

## 4. 通过_app.js添加通用的头部信息
- 如果有多个，头部信息会自动合并
- 只保留最新的一个

## 5. 新文档_document.js
- _document.js必须在pages文件夹的根目录下
- _app.js是所有页面的shell(外壳)，比如给_app.js添加layout，从而获得统一的nav样式
- _document.js是HTML文件的外壳，可以用来定义文档




## 6. 使用Next/Image提供的<Image/>优化图片加载性能

- `import Image from 'next/image'`
- 使用</Image>替换<img>
- 使用</Image>时，粘贴原有的属性，并且添加width和height
- 一般来说，使用本地图片，如果使用网络图片，需要配置允许加载图片的外部域名，方法如下

Next.js 的 `<Image />` 组件是为了优化图片加载和提供更好的性能，但它需要在 `next.config.js` 文件中配置允许加载图片的外部域名。默认情况下，Next.js 不允许加载来自外部域的图片，除非你明确配置这些域名。

你可以通过以下步骤来解决这个问题：

1. **打开你的 `next.config.js` 文件**，如果不存在，则创建一个。
2. **添加或修改 `images` 配置**，添加允许的外部域名：

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['picsum.photos'],
  },
}
```

3. **保存 `next.config.js` 文件**，然后重新启动你的 Next.js 开发服务器。

- ### 示例代码

你的组件代码可能看起来像这样：

```jsx
import Image from 'next/image'

const MyComponent = () => (
  <div>
    <Image
      src="https://picsum.photos/id/300/300/300"
      alt="Sample Image"
      width={300}
      height={300}
    />
  </div>
)

export default MyComponent
```

配置完成后，再次运行你的应用，应该不会再出现该错误。这样，Next.js 就能处理来自 `picsum.photos` 的图片，并应用其内置的优化功能。

- ### 总结

- **配置外部域名**：在 `next.config.js` 文件中配置 `images.domains` 来允许外部图片源。
- **重启开发服务器**：每次修改 `next.config.js` 后，都需要重新启动开发服务器以应用更改。

完成这些步骤后，Next.js 的 `<Image />` 组件就可以正确加载和优化来自外部域名的图片了。

## Next/Image加载器的使用

加载器
一个用于解析 URL 的自定义函数。Setting the loader as a prop on the Image component overrides the default loader defined in the images section of next.config.js.

Aloader是一个返回图像的 URL 字符串的函数，给定以下参数：
  src
  width
  quality

下面是使用自定义加载器的示例next/image：
``` jsx
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

