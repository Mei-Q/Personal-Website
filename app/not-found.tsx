import Link from "next/link";
import { Container } from "@/components/layout/container";

export default function NotFound() {
  return (
    <Container className="py-20">
      <div className="max-w-xl">
        <p className="text-sm font-semibold text-lab-teal">404</p>
        <h1 className="mt-3 text-3xl font-semibold">没有找到这个页面</h1>
        <p className="mt-4 text-[rgb(var(--muted-foreground))]">
          可能是链接已经移动，或者对应的 Markdown / MDX 文件还没有创建。
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-lab-teal px-4 py-2 text-sm font-medium text-white"
        >
          返回首页
        </Link>
      </div>
    </Container>
  );
}
