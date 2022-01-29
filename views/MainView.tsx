import React, { VFC } from "react";
import LoadingSplashView from "./LoadingSplashView";
import LoadingOverlay from "./LoadingOverlay";
import { Drawing } from "../types/drawing";
import { GlobalRoles } from "../types/auth";
import MenuLayerView from "../components/layers/MenuLayerView";
import MenuLayerEdit from "../components/layers/MenuLayerEdit";
import useAuth from "../hooks/useAuth";
import CanvasLayer from "../components/layers/CanvasLayer";
import BaseLayer from "../components/layers/BaseLayer";
import HelperDialog from "../components/HelperDialog";
import { NormalButton } from "../components/Buttons";

interface Props {
  drawing: Drawing | null;
}

const MainView: VFC<Props> = ({ drawing }) => {
  const auth = useAuth();
  if (drawing) {
    return (
      <div>
        {drawing.loading && <LoadingOverlay />}
        {!drawing.loading && !drawing.addition?.url && (
          <HelperDialog top="var(--navbar-offset)" right={0}>
            <h3>New Topic!</h3>
            <p>{`You're the first here, make a meaningful contribution!`}</p>
          </HelperDialog>
        )}
        <div>
          {auth?.role === GlobalRoles.view || drawing.topic?.locked ? <MenuLayerView /> : <MenuLayerEdit />}
          <CanvasLayer />
          <BaseLayer image={!drawing.loading ? drawing?.addition?.url : undefined} />
        </div>
      </div>
    );
  }

  return <LoadingSplashView />;
};

export default MainView;
