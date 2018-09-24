<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="UI_Internet.Pages.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,minimal-ui" />

    <meta name="author" content="Municipalidad de Córdoba" />
    <meta name="description" content="" />
    <meta name="twitter:creator" content="@municba" />
    <meta property="fb:admins" content="MuniCba" />

    <link href="<%=ResolveUrl("~/Pages/Images/VecinoVirtual.png") %>" rel="shortcut icon" />

    <link href="<%=ResolveUrl("~/Pages/Styles/Login.css?v=" + ConfigurationManager.AppSettings["VERSION"]) %>" rel="stylesheet" />
    <script type="text/javascript" src="<%=ResolveUrl("~/Pages/Scripts/Login.js?v=" + ConfigurationManager.AppSettings["VERSION"]) %>"></script>
</head>
<body>
    <script type="text/javascript">
        var baseUrl = "<%= ResolveUrl("~/") %>";
    </script>

    <iframe src="<%=ConfigurationManager.AppSettings["URL_LOGIN"] %>"></iframe>
</body>
</html>
