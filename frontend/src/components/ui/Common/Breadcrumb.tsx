import Link from "next/link";

const Breadcrumb = ({
  pageName,
  pageDescription,
}: {
  pageName: string;
  pageDescription?: string;
}) => {
  return (
    <div className="relative z-10 overflow-hidden pb-14 pt-30 md:pt-32 pt-[120px] lg:pt-40 dark:bg-dark">
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-stroke to-transparent dark:via-dark-3"></div>
      <div className="container">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold text-primary sm:text-4xl md:text-[40px] md:leading-[1.2] dark:text-primary">
            {pageName}
          </h1>
          {pageDescription && (
            <p className="mb-5 text-base text-body-color dark:text-dark-6">
              {pageDescription}
            </p>
          )}
          <ul className="flex items-center justify-center gap-2">
            <li>
              <Link href="/" className="text-base font-medium text-primary dark:text-primary">
                Home
              </Link>
            </li>
            <li className="text-base font-medium text-body-color">
              <span className="mx-2 dark:text-dark-6">/</span>
              {pageName}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
