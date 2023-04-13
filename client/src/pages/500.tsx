import Error from 'next/error';

const Custom500 = () => <Error statusCode={500} />;

Custom500.getLayout = (page: React.ReactElement) => <>{page}</>;

export default Custom500;
