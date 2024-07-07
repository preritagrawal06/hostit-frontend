import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import { userStore } from "@/store/userStore"
import { CallBackendApi } from "@/lib/utils/callBackendApi"

interface envSchema {
    name: string,
    value: string
}

const FormSchema = z.object({
    name: z.string(),
    gitUrl: z.string(),
    build: z.string(),
    directory: z.string(),
    env: z.array(z.object({ name: z.string(), value: z.string() })),
    pkgmngr: z.string()
})

const NewProject = () => {

    const navigate = useNavigate()
    const user = userStore((state) => state.user)

    const [envVars, setEnvVars] = useState<envSchema[]>([])

    const handleChange = (index: number, field: 'name' | 'value', value: string) => {
        const newenvVars = [...envVars];
        newenvVars[index][field] = value;
        setEnvVars(newenvVars);
    };

    const handleAddVariable = () => {
        setEnvVars([...envVars, { name: '', value: '' }]);
    };

    const handleRemoveVariable = (index: number) => {
        const newenvVars = envVars.filter((_, i) => i !== index);
        setEnvVars(newenvVars);
    };

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            gitUrl: "",
            build: "npm run build",
            directory: "",
            env: envVars,
            pkgmngr: "npm"
        },
    })

    async function onSubmit(reqData: z.infer<typeof FormSchema>) {
        reqData.env = envVars

        try {
            const data = await CallBackendApi({ endpoint: "/project", body: reqData })
            // console.log(data);
            if (data.success) {
                toast({
                    title: "Success",
                    description: data.message,
                })
                const overrides = [
                    {
                        name: "pkgmngr",
                        value: reqData.pkgmngr
                    },
                    {
                        name: "buildCommand",
                        value: reqData.build
                    },
                    {
                        name: "directory",
                        value: reqData.directory
                    }
                ]
                
                const deployData = await CallBackendApi({ endpoint: "/deploy", body: { projectId: data.project.id, envs: reqData.env, overrides } })
                console.log(deployData);
                navigate(`/project/${data.project.id}`)
            } else {
                toast({
                    title: "Error",
                    description: data.message,
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: (error as Error).message
            })
        }

    }

    return (user ?
        (
            <div className="w-full flex justify-center p-10">
                <div className="w-[80%] flex flex-col items-center gap-6 px-0 md:px-4 py-4">
                    <Toaster />
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 md:w-2/3 space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input required placeholder="Name of your project" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the name of your project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="gitUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Github URL</FormLabel>
                                        <FormControl>
                                            <Input required placeholder="github URL" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            URL of your github repository (Make sure that the repo is public)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="build"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Build Command</FormLabel>
                                        <FormControl>
                                            <Input placeholder="npm run build" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Build command for your project
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pkgmngr"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Package Manager</FormLabel>
                                        <FormControl>
                                            <Input placeholder="npm" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Package manager for your project (eg: npm, yarn)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="directory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Publish Directory</FormLabel>
                                        <FormControl>
                                            <Input placeholder="./" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Path to directory containing build assets
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4">
                                <FormLabel>Environment Variables (optional)</FormLabel>
                                <FormDescription>Add environment variables for your project</FormDescription>
                                {
                                    envVars.map((env: envSchema, index: number) => {
                                        return (
                                            <div key={index} className="flex gap-2 items-center">
                                                <Input placeholder="Key" value={env.name} onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                                <Input placeholder="Value" value={env.value} onChange={(e) => handleChange(index, 'value', e.target.value)} />
                                                <Button variant="outline" type="button" onClick={() => handleRemoveVariable(index)}>
                                                    <img src="/delete.svg" alt="delete icon" width={32} height={32} />
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                                <Button variant="ghost" type="button" className="w-8" onClick={() => handleAddVariable()}>Add</Button>
                            </div>
                            <Button type="submit">Create Project</Button>
                        </form>
                    </Form>
                </div>
            </div>
        )
        :
        <Navigate to="/auth" />
    );
}

export default NewProject;