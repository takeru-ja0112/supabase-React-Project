export default function BackScreen({
    children
}:{
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="min-h-screen bg-white dark:bg-gray-900 font-sans">
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                    {children}
                </div>
            </div>
        </>
    );
}