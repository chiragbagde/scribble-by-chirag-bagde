import React, { useEffect, useState } from "react";

import { Delete, Edit, Plus, Check } from "neetoicons";
import { Typography, Toastr, Input } from "neetoui";

import RedirectionsApi from "apis/redirections";
import PageLoader from "components/PageLoader";

const Redirections = () => {
  const [redirections, setRedirections] = useState([]);
  const [showInput, setShowInput] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showId, setShowId] = useState(null);
  const [oldUrl, setOldUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [createRedirection, setCreateRedirection] = useState(false);
  const [updateRedirections, setUpdateRedirections] = useState(false);

  const fetchRedirections = async () => {
    try {
      const {
        data: { redirections },
      } = await RedirectionsApi.list();
      setRedirections(redirections);
      setLoading(false);
      setUpdateRedirections(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
      setUpdateRedirections(false);
    }
  };

  const handleDelete = async id => {
    try {
      setUpdateRedirections(true);
      await RedirectionsApi.destroy(id);
      Toastr.success("Redirection deleted successfully.");
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setUpdateRedirections(true);
      await RedirectionsApi.create({ old_url: oldUrl, new_url: newUrl });
      Toastr.success("Redirection created successfully.");
      setLoading(false);
      setCreateRedirection(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
      setCreateRedirection(false);
      Toastr.error("Cyclic redirection are not allowed!");
    }
  };

  const handleCreateRedirection = () => {
    setCreateRedirection(!createRedirection);
    setUpdateRedirections(true);
    setOldUrl("");
    setNewUrl("");
  };

  const handleUpdateRedirection = async () => {
    try {
      setUpdateRedirections(true);
      await RedirectionsApi.update(
        { old_url: oldUrl, new_url: newUrl },
        showId
      );
      Toastr.error("Cyclic Redirections not possible");
    } catch (error) {
      logger.error(error);
      setLoading(false);
      Toastr.success("Redirection updated successfully.");
      Toastr.error("Cyclic Redirections not possible");
    }
    await fetchRedirections();
    setShowInput(false);
  };

  const handleEdit = (id, old_url, new_url) => {
    setShowId(id);
    setOldUrl(old_url);
    setNewUrl(new_url);
    setShowInput(!showInput);
  };

  useEffect(() => {
    fetchRedirections();
  }, [updateRedirections]);

  if (loading) {
    return (
      <div className="h-screen w-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-1/2 flex-col space-y-6 py-6">
      <Typography style="h2">Redirections</Typography>
      <Typography className="text-gray-600" style="body2">
        Create and configure redirection rules to send users from old links to
        new links. All redirections are performed with 301 status codes to be
        SEO friendly.
      </Typography>
      <div className="flex items-start bg-indigo-100 p-6">
        <div className="w-full space-y-2 self-stretch text-left">
          <div className="flex justify-between">
            <span>FROM PATH</span>
            <span>TO PATH</span>
            <span>ACTIONS</span>
          </div>
          {redirections.map(({ new_url, old_url, id }) => (
            <div className="flex justify-between bg-white p-4" key={id}>
              {showInput && showId === id ? (
                <>
                  <div className="flex-col">
                    <span>{`localhost:3000/${old_url}`}</span>
                    <Input
                      className="mt-2"
                      value={oldUrl}
                      onChange={e => setOldUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex-col">
                    <span>{`localhost:3000/${new_url}`}</span>
                    <Input
                      className="mt-2"
                      placeholder={new_url}
                      value={newUrl}
                      onChange={e => setNewUrl(e.target.value)}
                      onKeyDown={e => {
                        e.key === "Enter" && handleUpdateRedirection(id);
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span>{`localhost:3000/${old_url}`}</span>
                  <span>{`localhost:3000/${new_url}`}</span>
                </>
              )}
              <span className="flex justify-center">
                <Edit
                  size={20}
                  onClick={() => {
                    handleEdit(id, old_url, new_url);
                  }}
                />
                <Delete size={20} onClick={() => handleDelete(id)} />
              </span>
            </div>
          ))}
          {createRedirection && (
            <div className="flex justify-between bg-white p-4">
              <div className="flex-col">
                <Input
                  value={oldUrl}
                  onChange={e => setOldUrl(e.target.value)}
                />
              </div>
              <div className="flex-col">
                <Input
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                />
              </div>
              <Check onClick={handleSubmit} />
            </div>
          )}
          <div className="my-6 flex p-4 text-indigo-500">
            <Plus size={20} onClick={handleCreateRedirection} />
            <Typography style="h5">Add New Redirection</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redirections;
