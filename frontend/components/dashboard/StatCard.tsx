import { Card, CardContent } from "@/components/ui/card";

interface Props {
    title: string;
    value: string;
}

export default function StatCard({ title, value }: Props) {
    return (
        <Card>
            <CardContent className="p-6">
                <p className="text-gray-500">
                    {title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                    {value}
                </h2>
            </CardContent>
        </Card>
    );
}