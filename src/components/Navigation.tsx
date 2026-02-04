'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react'; // Added Fragment

export default function Navigation() {
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    let path = '';
    const breadcrumbs = [];

    // Push the base home link using a keyed Fragment
    breadcrumbs.push(
        <Fragment key="home-base">
            <Link href="/" className="hover:underline">~</Link>
            &nbsp;<span> {' / '} </span>
        </Fragment>
    );

    segments.forEach((segment, idx) => {
        path += '/' + segment;
        breadcrumbs.push(
            <span key={`space-before-${idx}`}> &nbsp; </span>,
            <Link
                key={segment}
                href={path}
                className="hover:underline"
            >
                {segment.replace(/-/g, ' ')}
            </Link>,
            <span key={`space-slash-${idx}`}> {' / '} </span>
        );
    });

    if (breadcrumbs.length > 1) breadcrumbs.pop();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="font-mono text-lg font-semibold text-[var(--foreground)] flex items-center">
                    {breadcrumbs}
                </div>

                <div className="flex items-center space-x-8">
                    <Link
                        href="/"
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus:text-[var(--foreground)] focus:outline-none"
                    >
                        Home
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus:text-[var(--foreground)] focus:outline-none"
                    >
                        About
                    </Link>
                    <Link
                        href="/projects"
                        className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)] focus:text-[var(--foreground)] focus:outline-none"
                    >
                        Projects
                    </Link>
                </div>
            </div>
        </nav>
    );
}