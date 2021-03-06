package net.mullvad.mullvadvpn.ui

import android.content.res.Resources
import android.view.View
import net.mullvad.mullvadvpn.R
import net.mullvad.mullvadvpn.model.TunnelState

class HeaderBar(val parentView: View, val resources: Resources) {
    private val headerBar: View = parentView.findViewById(R.id.header_bar)

    private val securedColor = resources.getColor(R.color.green)
    private val unsecuredColor = resources.getColor(R.color.red)

    fun setState(state: TunnelState) {
        when (state) {
            is TunnelState.Disconnected -> unsecured()
            is TunnelState.Connecting -> secured()
            is TunnelState.Connected -> secured()
            is TunnelState.Disconnecting -> secured()
            is TunnelState.Error -> {
                if (state.errorState.isBlocking) {
                    secured()
                } else {
                    unsecured()
                }
            }
        }
    }

    private fun unsecured() {
        headerBar.setBackgroundColor(unsecuredColor)
    }

    private fun secured() {
        headerBar.setBackgroundColor(securedColor)
    }
}
