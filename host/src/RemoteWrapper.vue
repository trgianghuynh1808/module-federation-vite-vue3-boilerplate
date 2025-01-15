<template>
  <div ref="mountPoint"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, type Router } from "vue-router";

const props = defineProps<{
  remoteName: string;
}>();

const route = useRoute();

const mountPoint = ref<HTMLElement | null>(null);
let remoteApp: { unmount: () => void; remoteRouter: Router } | null = null;

const loadRemote = async (remoteName: string) => {
  if (remoteApp) {
    remoteApp.unmount();
    remoteApp = null;
  }

  let remoteModule;
  try {
    switch (remoteName) {
      case "coreRemote":
        // @ts-ignore
        remoteModule = await import("coreRemote/remoteModule");
        break;
      case "fleetRemote":
        // @ts-ignore
        remoteModule = await import("fleetRemote/remoteModule");
        break;
      default:
        throw new Error(`Unknown remote: ${remoteName}`);
    }

    const { createRemoteBasePage } = remoteModule;

    if (mountPoint.value) {
      const { mount, unmount, remoteRouter } = createRemoteBasePage();

      // Initialize the remote router with a base URL specific to this remote
      remoteRouter.options.base = `/${remoteName}`;

      // Only try to navigate if the current route belongs to this remote
      if (route.path.startsWith(`/${remoteName}`)) {
        const relativePath = route.path.replace(`/${remoteName}`, "");

        await remoteRouter.push(relativePath);
      }

      mount(mountPoint.value);
      remoteApp = { unmount, remoteRouter };
    }
  } catch (error) {
    console.error(`Failed to load remote ${remoteName}:`, error);
  }
};

const loadRemoteStyles = async (remoteName: string) => {
  try {
    switch (remoteName) {
      case "coreRemote":
        // @ts-ignore
        await import("coreRemote/styles");
        break;
    }
  } catch (error) {
    console.warn(`Failed to load remote styles for ${remoteName}:`, error);
  }
};

onMounted(async () => {
  if (mountPoint.value) {
    await loadRemote(props.remoteName);
    await loadRemoteStyles(props.remoteName);
  }
});

onUnmounted(() => {
  if (remoteApp) {
    remoteApp.unmount();
  }
});

watch(
  [() => props.remoteName, () => route.path],
  async ([newRemoteName, oldRemoteName], [newPath, oldPath]) => {
    const isUpdatedRemote = newRemoteName !== oldRemoteName;
    const isUpdatedPath = newPath !== oldPath;

    if (!mountPoint.value) {
      return;
    }

    if (isUpdatedRemote) {
      await loadRemote(newRemoteName);
      await loadRemoteStyles(props.remoteName);
    }

    const { remoteRouter } = remoteApp ?? {};

    if (isUpdatedPath && remoteRouter) {
      try {
        const relativePath = newPath.replace(`/${props.remoteName}`, "");

        // Check if route exists in the remote before pushing
        const matchedRoute = remoteRouter.resolve(relativePath);

        if (
          matchedRoute.matched.length > 0 &&
          newPath.startsWith(`/${props.remoteName}`)
        ) {
          await remoteRouter.push(relativePath);
        } else {
          console.warn(`Route ${newPath} not found in remote router`);
        }
      } catch (error) {
        console.error(`Error syncing route: ${error}`);
      }
    }
  }
);
</script>
