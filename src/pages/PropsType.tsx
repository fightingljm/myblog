
export interface HeaderPropsType {
    title: string,
    url: BlogKeys,
}

export interface BlogPropsType {
    title: string,
    desc: string,
    url: string,
}

export type BlogKeys = 'javascript' | 'css' | 'html' | 'react' | 'reactnative' | 'ios' | 'swift' | 'objectivec'
| 'node' | 'terminal' | 'git' | 'es6' | 'flutter' | 'jest' | 'markdown' | 'sql' | "wechat" 

export type pathDataType = Array<HeaderPropsType>

export type blogDataType = Record<BlogKeys, Array<BlogPropsType>>
