using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;

namespace ListKeep.Web.service
{

    [WebService(Namespace = "http://listkeep.net")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class List : System.Web.Services.WebService
    {
        private string CreateRandom(int size)
        {
            var validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            char[] charList = new char[size];
            Random random = new Random();
            for (int i = 0; i < charList.Length; i++)
            {
                charList[i] = validChars[random.Next(validChars.Length)];
            }
            return new String(charList);
        }

        [WebMethod]
        public string CreateList(string name, string email)
        {
            string id = CreateRandom(8);
            //
            // TODO: Check to make sure string does not already exist in the (non-existant) data store
            // TODO: Save
            //
            return id;
        }

        [WebMethod]
        public string CreateListItem(string listID, string name)
        {
            string id = CreateRandom(16);
            //
            // TODO: Check to make sure string does not already exist in the (non-existant) data store
            // TODO: Save
            //
            return id;
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
