const fileData= values.file[0];
const fileInfo = {
    name: fileData.name,
    size: fileData.size,
    type: fileData.type,
    lastModified: fileData.lastModified,
    formTitle: values.title // lo obtengo de values, no de file[0]
  };
console.log(`VAlues es ${JSON.stringify(fileInfo)}`);
const types = {
    "image/png": "image",
    "application/pdf": "pdf",
    "text/csv": "csv",
  };

  try {


  const fileData = values.file[0];
  const formData = new FormData();
  formData.append("file", fileData);
  formData.append("title", values.title);


  const postUrl = "http://localhost:3000/api/3/upload";
  const result = await fetch(postUrl, {
      method: "POST",
      body: formData
  });
  const { msg, status } = await result.json();

    form.reset();

    setIsFileDialogOpen(false);

    toast.success(msg);

  //   toast({
  //     variant: "success",
  //     title: `File Uploaded ${msg}`,
  //     description: "Now everyone can view your file",
  //   });


  } catch (err) {
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "Your file could not be uploaded, try again later",
    });
  }


  return (

<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="flex gap-1"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit
              </Button>
            </form>

  )