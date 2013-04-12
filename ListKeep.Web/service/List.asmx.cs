using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;
using ListKeep.Lib;

namespace ListKeep.Web
{

    [WebService(Namespace = "http://listkeep.net")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class List : System.Web.Services.WebService
    {


        [WebMethod]
        public string GetListName(string listID)
        {
            try
            {
                ListEntity listEntity = new ListEntity("");
                listEntity.ListID = listID;
                listEntity.Select();
                return listEntity.ListName;
            }
            catch
            {
            }
            return string.Empty;
        }



        [WebMethod]
        public string CreateList(string listName, string listOwnerEmail)
        {
            try
            {
                ListEntity listEntity = new ListEntity(listName);
                int listID = listEntity.Insert();
                if (listID != 0)
                {
                    EmailEntity emailEntity = new EmailEntity(listID, listOwnerEmail);
                    emailEntity.Insert();
                }
                return listEntity.ListID;
            }
            catch
            {
                return string.Empty;
            }
        }

        [WebMethod]
        public string CreateListItem(string listID, string listItemName)
        {
            ListItemEntity entity = new ListItemEntity(listID, listItemName);
            return string.Empty;
        }

        [WebMethod]
        public void UpdateListItem(string listItemID, string text)
        {
            //
            // TODO: Save
            //
        }

    }

}
