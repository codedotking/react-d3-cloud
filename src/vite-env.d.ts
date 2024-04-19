/// <reference types="vite/client" />

import * as d3 from "d3";

// 假设 Cloud 类型已经在 d3 的 layout 命名空间下声明
export type Cloud = d3.layout.Cloud<d3.layout.cloud.Word>;

export type Word = d3.layout.cloud.Word;