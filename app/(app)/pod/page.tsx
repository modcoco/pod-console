"use client";
import useSWR, { mutate } from 'swr';
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { taskSchema } from "./data/schema";
import { useState } from 'react';

// 定义 fetcher 函数
const fetcher = async (namespace: string = 'default') => {
  const response = await fetch(`/api/container?pageSize=20&ns=${namespace}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const result = await response.json();
  return taskSchema.array().parse(result.data.containerList); // 解析为容器列表数组
};

// TaskPage 组件
export default function TaskPage() {
  const [namespace, setNamespace] = useState('default');
  const { data: tasks = [], error } = useSWR(['containers', namespace], () => fetcher(namespace));

  const handleRefresh = (namespace: string) => {
    setNamespace(namespace); // 更新 namespace
    mutate(['containers', namespace]); // 触发数据刷新
  };

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pod console</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your pods!
          </p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} onRefresh={handleRefresh} />
    </div>
  );
}

function performAction() {
  throw new Error("Function not implemented.");
}
