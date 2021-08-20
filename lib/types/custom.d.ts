declare module '*.svg' { // 告诉ts svg文件
  const content: any
  export default content
}

declare module '*.png' {
  const content: number;
  export default content
} 